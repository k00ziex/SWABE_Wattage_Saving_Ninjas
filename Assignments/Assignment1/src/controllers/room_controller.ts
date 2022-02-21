import { readFile } from 'fs'
import { join } from 'path'
import {sign, verify} from 'jsonwebtoken'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { RoomSchema } from '../models/room'

/******************************************************************************************************************/
/* Should be in some central file instead of copy */
import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'

const PUBLIC_KEY_PATH = join(__dirname,'..','..','public','auth-rsa256.key.pub')
const PRIVATE_KEY_PATH = join(__dirname,'..','..','private','auth-rsa256.key')

const X5U = 'http://localhost:3000/auth-rsa256.key.pub' // Tobias 
/******************************************************************************************************************/
const roomCon = mongoose.createConnection('mongodb://localhost:27017/assignment1-users') // Tobias
const RoomModel = roomCon.model('Room', RoomSchema)

// GET /rooms–list all rooms. Accessible for roles manager, clerk, and guest. It should be possible to filter based on availability
const listRooms = async (req: Request, res: Response) => {
    try {
        const { available } = req.query;
        
        let filter = { }; 

        // Filter on availability
        if(available){
            filter = {...filter, available} 
        }
    
        let result = await RoomModel.find(filter, { __v: 0 }).lean();
        res.json(result);
    } catch(error){
        printError(error);
    }
};

// GET /rooms/{:uid}–view room details. Accessible for roles manager, clerk, amd guest
const getRoom = async(req: Request, res: Response) => {
    try{
        const {uid} = req.params;
        let filter = { _id: uid }; // Filter on mongo id

        let result = await RoomModel.find(filter, { __v: 0 }).exec();
    } catch(error){
        printError(error);
    }
};

// POST /reservations/{:uid}–create reservation. Accessible for roles manager, clerk, and guest
const createRoom = async(req: Request, res: Response) => {
    try{
        const room = req.body;
        console.debug("Creating room:\n" + room);

        let {id} = await new RoomModel(room).save();

        res.json(id); // TODO better msg?
    }
    catch(error){
        printError(error);
    }
}

// PATCH /reservations/{:uid}—modify reservation. Accessible for roles manager, clerk, and guest (if created by guest)
const modifyRoom = async(req: Request, res: Response) => {
    try{
        const {uid} = req.params;
        const newRoom = req.body;
        let filter = {_id: uid, }
        console.debug("Modifying room to have details:\n" + newRoom);
        let modifiedRoom = RoomModel.updateOne(filter, newRoom).exec(); // TODO: Might need to specify what properties to overwrite.
        res.json({uid, modifiedRoom});
    }
    catch(error){
        printError(error);
    }
}


// DELETE /reservations/{:uid}–delete reservation. Accessible for roles manager, clerk
const deleteRoom = async(req: Request, res: Response) => {
    try{
        const {uid} = req.params;
        console.debug("Removing room with uid: " + uid);

        let result = RoomModel.deleteOne({_id: uid}).exec();

        res.json(result);
    }
    catch(error){
        printError(error);
    }
}

/**
 * @param error Prints error as console.error with a standard pre-text. 
 */
function printError(error: any){
    console.error("Error caught\n" + error);
}