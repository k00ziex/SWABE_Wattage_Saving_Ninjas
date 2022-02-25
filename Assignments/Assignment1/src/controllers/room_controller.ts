import { readFile } from 'fs'
import { join } from 'path'
import {sign, verify} from 'jsonwebtoken'
import { Request, Response } from 'express'
import mongoose, { mongo } from 'mongoose'

import { RoomSchema, Room } from '../models/room'

/******************************************************************************************************************/
/* Should be in some central file instead of copy */
import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'

const PUBLIC_KEY_PATH = join(__dirname,'..','..','public','auth-rsa256.key.pub')
const PRIVATE_KEY_PATH = join(__dirname,'..','..','private','auth-rsa256.key')

const X5U = 'http://127.0.0.1:3000/auth-rsa256.key.pub' // Tobias 
/******************************************************************************************************************/
const roomCon = mongoose.createConnection('mongodb://127.0.0.1:27017/assignment1-users') // Tobias
const RoomModel = roomCon.model('Room', RoomSchema)

// TODO: Role authorization
function getRoles(req: Request){
    return req.body.rights;
}

// GET /rooms–list all rooms. Accessible for roles manager, clerk, and guest. It should be possible to filter based on availability
export const listRooms = async (req: Request, res: Response) => {
    try {
        var roles = getRoles(req);
        console.log("Roles are: " + roles);
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
        const {uid} = req.params; // Ignore since mongo will create this for us? TODO: Can set if present.
        let room = req.body;
        
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
}