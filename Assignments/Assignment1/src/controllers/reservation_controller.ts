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


// GET /rooms–list all rooms. Accessible for roles manager, clerk, and guest. It should be possible to filter based on availability
export const listReservations = async (req: Request, res: Response) => {

};

// GET /rooms/{:uid}–view room details. Accessible for roles manager, clerk, amd guest
export const viewReservation = async(req: Request, res: Response) => {

};

// POST /rooms/{:uid}–create room. Accessible for roles manager
export const createReservation = async(req: Request, res: Response) => {

}

// PATCH /rooms/{:uid}–modify room. Accessible for roles manager, clerk
export const modifyReservation = async(req: Request, res: Response) => {

}

// DELETE /rooms/{:uid}–delete room. Accessible for roles manager
export const deleteReservation = async(req: Request, res: Response) => {

}

/**
 * @param error Prints error as console.error with a standard pre-text and returns.
 */
function returnError(error: any, res: Response){

}