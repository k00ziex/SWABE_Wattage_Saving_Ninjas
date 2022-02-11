import {Schema} from 'mongoose'

export interface Order {
    material : string,
    amount : number,
    currency : string,
    timestamp : Date,
    delivery : {
        first_name : string,
        last_name : string,
        address : {
            street_name : string,
            street_number : string,
            city : string
        }
    }
}


export const schema = new Schema<Order> ({
    material : String,
    amount : Number,
    currency : String,
    timestamp : Number,
    delivery : {
        first_name : String,
        last_name : String,
        address : {
            street_name : String,
            street_number : Number,
            city : String
        }
    }

})