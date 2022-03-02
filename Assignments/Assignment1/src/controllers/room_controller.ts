
import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { RoomSchema } from '../models/room'

import { isClerk, isGuest, isManager } from "../utils/role-check"

const roomCon = mongoose.createConnection('mongodb://127.0.0.1:27017/assignment1-users') // Tobias
const RoomModel = roomCon.model('Room', RoomSchema)


// GET /rooms–list all rooms. Accessible for roles manager, clerk, and guest. It should be possible to filter based on availability
export const listRooms = async (req: Request, res: Response) => {
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
    
        let result = await RoomModel.find(filter, { __v: 0 }).lean();
        res.json(result);
    } catch(error){
        returnError(error, res);
    }
};

// GET /rooms/{:uid}–view room details. Accessible for roles manager, clerk, amd guest
export const getRoom = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req) && !isGuest(req)){
            res.sendStatus(401);
            return;
        }

        const {uid} = req.params;
        console.debug("Getting room with uid:\n" + uid)
        let filter = {_id: uid}; 

        let result = await RoomModel.find(filter, { __v: 0 }).exec();
        res.json(result);
    } catch(error){
        returnError(error, res);
    }
};

// POST /rooms/{:uid}–create room. Accessible for roles manager
export const createRoom = async(req: Request, res: Response) => {
    try{
        if(!isManager(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params; 
        let room = req.body;
        
        // Set uid if specified by user
        if(uid != null){
            room._id = new mongoose.mongo.ObjectId(uid);
        }
        
        console.debug("Creating room:\n" + room);

        let {id} = await new RoomModel(room).save();
        res.json({"Created":{"uid": id, "Created": room}});
}
    catch(error){
        returnError(error, res);
    }
}

// PATCH /rooms/{:uid}–modify room. Accessible for roles manager, clerk
export const modifyRoom = async(req: Request, res: Response) => {
    try{
        if(!isManager(req) && !isClerk(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params;
        const newRoom = req.body;
        let filter = {_id: uid, }
        console.debug("Modifying room to have details:\n" + newRoom);
        let modifiedRoom = RoomModel.updateOne(filter, newRoom).exec(); // TODO: Might need to specify what properties to overwrite.
        res.json({uid, modifiedRoom});
    }
    catch(error){
        returnError(error, res);
    }
}

// DELETE /rooms/{:uid}–delete room. Accessible for roles manager
export const deleteRoom = async(req: Request, res: Response) => {
    try{
        if(!isManager(req)){
            res.sendStatus(401);
            return;
        }
        const {uid} = req.params;
        console.debug("Removing room with uid: " + uid);

        let result = RoomModel.deleteOne({_id: uid}).exec();

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