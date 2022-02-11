import { Schema } from 'mongoose'

export interface Order {
    material: string,
    amnt: number,
    currency: string,
    price: number,
    timestamp: Date,
    delivery: {
        first_name: string,
        last_name: string,
        address: {
            street_name: string,
            street_number: string,
            city: string,
        },
    }
  }

export const schema = new Schema<Order>({
    material: {type: String, required: true},
    amnt: {type: Number, required: false},
    currency: {type: String, required: true},
    price: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    delivery: {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        address: {
            street_name: {type: String, required: true},
            street_number: {type: String, required: true},
            city: {type: String, required: true},
        },
    }
})