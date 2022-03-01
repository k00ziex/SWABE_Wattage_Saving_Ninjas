import { readFile } from 'fs'
import { join } from 'path'
import {sign, verify} from 'jsonwebtoken'
import { Request, Response } from 'express'
import mongoose, { mongo } from 'mongoose'

import { RoomSchema, Room } from '../models/room'

import { isClerk, isGuest, isManager } from "../utils/role-check"
import { ReservationSchema } from '../models/reservation'

const reservationCon = mongoose.createConnection('mongodb://127.0.0.1:27017/assignment1-users') // Thomas
const ReservationModel = reservationCon.model('Reservation', ReservationSchema)


export const listReservations = async (req: Request, res: Response) => {
    try {
        if(!isManager(req) && !isClerk(req) && !isGuest(req)){
            console.log("No rights")
            res.sendStatus(401);
            return;
        }
        
        const { available } = req.query;
        let filter = { }; 

        // Filter on availability
        if(available){
            filter = {...filter, available} 
        }
    
        let result = await ReservationModel.find(filter, { __v: 0 }).lean();
        res.json(result);
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
        if(!isManager(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params; // Ignore since mongo will create this for us? TODO: Can set if present.
        let reservation = req.body;
        
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
        if(!isManager(req) && !isClerk(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params;
        const newRoom = req.body;
        let filter = {_id: uid, }
        console.debug("Modifying room to have details:\n" + newRoom);
        let modifiedReservation = ReservationModel.updateOne(filter, newRoom).exec(); // TODO: Might need to specify what properties to overwrite.
        res.json({uid, modifiedReservation});
    }
    catch(error){
        returnError(error, res);
    }
}

export const deleteReservation = async(req: Request, res: Response) => {
    try{
        if(!isManager(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params;
        console.debug("Removing room with uid: " + uid);

        let result = ReservationModel.deleteOne({_id: uid}).exec();

        res.json(result);
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