import { Schema } from 'mongoose'

export interface Room {
    roomNumber: Number
    bedInformation: String
    floorNumber: Number
    privateBathroom: Boolean
    fridgeInRoom: Boolean
    comments: String
  }

export const ReservationSchema = new Schema<Room>({
    roomNumber: { type: Number, required: true },
    bedInformation: {type: String, required: true},
    floorNumber: {type: Number},
    privateBathroom: {type: Boolean},
    fridgeInRoom: {type: Boolean},
    comments: {type: String}    
  })