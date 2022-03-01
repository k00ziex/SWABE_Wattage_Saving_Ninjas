import { Router, json } from 'express'
import { listReservations, viewReservation, createReservation, modifyReservation, deleteReservation } from '../controllers/reservation_controller'

const router = Router()
router.use(json())

router.get('/reservation', listReservations);
router.get('/reservation/:uid', viewReservation);
router.post('/reservation/:uid?', createReservation);
router.patch('/reservation/:uid', modifyReservation);
router.delete('/reservation/:uid', deleteReservation);

export { router as ReservationRouter }