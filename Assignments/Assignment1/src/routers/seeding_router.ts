import { Router, json } from 'express'
import { seedUserDatabase, seedRoomDatabase } from '../controllers/seeding_controller'


const router = Router()
router.use(json())

router.get('/user_dataseeding', seedUserDatabase)
router.get('/room_dataseeding', seedRoomDatabase)

export { router as DataseedingRouter }