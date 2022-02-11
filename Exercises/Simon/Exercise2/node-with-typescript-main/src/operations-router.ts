import {Router} from 'express'
import {Operations} from './operations-controller'

const router = Router()

router.get('/orders', Operations.list)
router.post('/orders',Operations.create)
router.get('/orders/bootstrap',Operations.bootstrap)
router.get('/orders/:uid',Operations.read)
router.put('/orders/:uid',Operations.overwrite)
router.patch('/orders/:uid',Operations.update)
router.delete('/orders/:uid',Operations.remove)


export const operations = router