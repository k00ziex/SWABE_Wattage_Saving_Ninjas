import {Schema} from 'mongoose'

export interface Order {
    "material": string,
    "amount": number,
    "price": number,
    "timestamp":Date,
    "delivery":{
        "first_name": string,
        "last_name": string,
        "address":{
            "street_name": string,
            "street_number": number,
            "city": string
        }
    }
}

export const orderSchema = new Schema<Order>({
    material: {type: String, required: true},
    amount: {type: Number, required: false},
    price: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    delivery: {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        address: {
            street_name: {type: String, required: true},
            street_number: {type: Number, required: true},
            city: {type: String, required: true}
        }
    }
});