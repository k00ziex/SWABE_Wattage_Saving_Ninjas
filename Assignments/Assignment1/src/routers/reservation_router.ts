import { Router, json } from 'express'
import { listReservations, viewReservation, createReservation, modifyReservation, deleteReservation } from '../controllers/reservation_controller'

const router = Router()
router.use(json())

router.get('/rooms', listReservations);
router.get('/rooms/:uid', viewReservation);
router.post('/rooms/:uid?', createReservation);
router.patch('/rooms/:uid', modifyReservation);
router.delete('/rooms/:uid', deleteReservation);

export { router as ReservationRouter }