import { readFile } from 'fs'
import { join } from 'path'
import {sign, verify} from 'jsonwebtoken'
import { Request, Response } from 'express'
import mongoose, { mongo } from 'mongoose'

import { RoomSchema, Room } from '../models/room'

import { isClerk, isGuest, isManager } from "../utils/role-check"
import { Reservation, ReservationSchema } from '../models/reservation'
import { getRoleFromJwt } from '../utils/jwt-helper'
import { findUserByEmail } from './user_controller'

const reservationCon = mongoose.createConnection('mongodb://127.0.0.1:27017/assignment1-users') // Thomas
const ReservationModel = reservationCon.model('Reservation', ReservationSchema)


export const listReservations = async (req: Request, res: Response) => {
    try {
        if(!isManager(req) && !isClerk(req)){
            console.log("No rights")
            res.sendStatus(401);
            return;
        }
        
        const { to, from } = req.query;


        var result;
        // From
        if(from && !to){
            result = await ReservationModel.find({fromDate: from})
        }
        else if (!from && to){
            result = await ReservationModel.find({toDate: to}) 
        }
        else if(to && from){
            result = await ReservationModel.find({fromDate: from, toDate: to})
        }else{
            result = await ReservationModel.find({})
        }
        return res.json(result)
    } catch(error){
        returnError(error, res);
    }

};

export const viewReservation = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req) && !isGuest(req)){
            res.sendStatus(401);
            return;
        }

        const {uid} = req.params;
        console.debug("Getting reservation with uid:\n" + uid)
        let filter = {_id: uid}; 

        let result = await ReservationModel.find(filter, { __v: 0 }).exec();
        res.json(result);
    } catch(error){
        returnError(error, res);
    }

};

export const createReservation = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req) && !isGuest(req)){
            res.sendStatus(401);
            return;
        }
        console.log(req.params)
        const {uid} = req.params; // Ignore since mongo will create this for us? TODO: Can set if present.
        let filter = {_id: uid, }

        // Check if reservation is already reserved
        let roomReservation = await ReservationModel.findOne(filter) as Reservation
        
        if(roomReservation != null){
            return res.status(400).send("A reservation already exist with id: " + uid)
        }

        

        let {roomNumber} = req.body

        let roomReservationByRoomNumber = await ReservationModel.findOne({roomNumber: roomNumber}) as Reservation

        if(roomReservationByRoomNumber != null){
            return res.status(400).send("A reservation already exist with roomNumber: " + roomReservationByRoomNumber.roomNumber)
        }

        let reservation = req.body;

        if(uid != null){
            reservation._id = new mongoose.mongo.ObjectId(uid);
        }
        
        console.debug("Creating reservation:\n" + reservation);

        let {id} = await new ReservationModel(reservation).save();
        res.json({"Created":{"uid": id, "Created": reservation}});
}
    catch(error){
        returnError(error, res);
    }

}

export const modifyReservation = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req) && !isGuest(req)){
            console.log('123')
            res.sendStatus(401);
            return;
        }

        const {uid} = req.params;

        // Reservation creds
        let filterinital = {_id: uid}; 

        let findReservation = await ReservationModel.findOne({filterinital}, { __v: 0 }) as Reservation

        let emailOfReservation = findReservation.emailOfReserver

        let reservationAccessRights = await findUserByEmail(emailOfReservation.toString())
        if(reservationAccessRights == null){
            res.status(400).send("Email is not valid to a user")
        }
        let reservationaccessrights = reservationAccessRights['accessRights']


        // JWT owner creds
        let email = getRoleFromJwt(req);

        // Verify role from database
        let response = await findUserByEmail(email)

        let jwtaccessrights = response['accessRights']

        if(jwtaccessrights == "guest" && reservationaccessrights != "guest"){
            res.status(400).send("Yo, you're not permitted to do this, you're just a " + jwtaccessrights)
        }

        const newReservation = req.body;

        let filter = {_id: uid }
        console.debug("Modifying room to have details:\n" + newReservation);
        let modifiedReservation = await ReservationModel.updateOne(filter, newReservation).exec(); // TODO: Might need to specify what properties to overwrite.
        res.json({uid, newReservation});
    }
    catch(error){
        returnError(error, res);
    }
}

export const deleteReservation = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params;
        console.debug("Removing room with uid: " + uid);

        let result = await ReservationModel.findOneAndDelete({_id: uid}).exec();
        if(result == null){
            return res.status(400).send("Could not find a reservation to delete with id: " + uid)
        }

        res.json("Removing room with uid: " + uid);
    }
    catch(error){
        returnError(error, res);
    }
}

/**
 * @param error Prints error as console.error with a standard pre-text and returns.
 */
 function returnError(error: any, res: Response){
    console.error("Error caught\n" + error);
    res.status(500);
    res.send("Something went wrong...\n" + error);
    return;
}