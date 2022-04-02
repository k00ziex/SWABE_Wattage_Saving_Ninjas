import { Router } from "express";
import { publish_msg } from "./service.js";
let router = Router();

router.post('/booking', async(req,res) => {
    let data = req.body;
    const exchange_name = 'ReservationExchange'
    const key = 'hotel.room.reservation.topic'
    await publish_msg(exchange_name,key,data)
    res.json({'status' : 'Booking request has been sent'})
});


export const operations = router;