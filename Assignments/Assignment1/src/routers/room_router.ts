import { Router, json } from 'express'
import { listRooms, getRoom, createRoom, modifyRoom, deleteRoom } from '../controllers/room_controller'

const router = Router()

router.use(json())

router.get('/rooms', listRooms);
router.get('/rooms/:uid', getRoom);
router.post('/rooms/:uid?', createRoom);
router.patch('/rooms/:uid', modifyRoom);
router.delete('/rooms/:uid', deleteRoom);

export { router as RoomRouter }