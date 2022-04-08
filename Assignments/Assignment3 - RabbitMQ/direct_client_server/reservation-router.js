import { Router } from "express";
import { publish_msg } from "./service.js";
let router = Router();

router.post('/booking', async(req,res) => {
    let data = req.body;
    const exchange_name = 'ReservationExchange'
    const key = 'hotel.room.reservation.topic'
    if(validateJson(data)) {
        await publish_msg(exchange_name,key,data)
        //res.json({'status' : 'Booking request has been sent'})
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
});

function validateJson(data) {
    var properties = Object.getOwnPropertyNames(data)
    console.log(properties)
    var property_checks = 0
    var checkin_date = null
    var checkout_date = null

    for(var i = 0; i < properties.length; i ++) {
        if(properties[i].toLowerCase() === "hotelid" ) {
            property_checks++
        } else if (properties[i].toLowerCase() === "checkin") {
            checkin_date = new Date(Date.parse(data['checkIn'])).toISOString()
            if(checkin_date === data['checkIn']) {
                property_checks++
            }
        } else if (properties[i].toLowerCase() === "checkout") {
            checkout_date = new Date(Date.parse(data['checkOut'])).toISOString()
            if(checkout_date === data['checkOut']) {
                property_checks++
            }
        } else if (properties[i].toLowerCase() === "roomno") {
            property_checks++
        } else if (properties[i].toLowerCase() === "customername") {
            property_checks++
        } else if (properties[i].toLowerCase() === "customeremail") {
            property_checks++
        } else if (properties[i].toLowerCase() === "customeraddress") {
            property_checks++
        }
    }

    if(property_checks === properties.length) {
        return true
    } else {
        return false
    }

}

export const operations = router;