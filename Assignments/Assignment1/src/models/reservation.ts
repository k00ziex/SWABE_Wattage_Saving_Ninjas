import { Schema } from 'mongoose'


export interface Reservation {
    fromDate: Date
    toDate: Date
    roomNumber: Number
    nameOfReserver: String
    emailOfReserver: String
    commentsOrRequests: String
  }

export const ReservationSchema = new Schema<Reservation>({
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true }, 
    roomNumber: { type: Number, required: true},
    nameOfReserver: {type: String, required: true},
    emailOfReserver: {type: String, required: true},
    commentsOrRequests: {type: String}
  })