import { Schema } from 'mongoose'

export interface Room {
    roomNumber: Number
    available: Boolean
    bedInformation: String
    floorNumber: Number
    privateBathroom: Boolean
    fridgeInRoom: Boolean
    comments: String
  }

export const RoomSchema = new Schema<Room>({
    roomNumber: { type: Number, required: true, unique: true },
    available: {type: Boolean, required: true},
    bedInformation: {type: String, required: true},
    floorNumber: {type: Number},
    privateBathroom: {type: Boolean},
    fridgeInRoom: {type: Boolean},
    comments: {type: String}    
  })