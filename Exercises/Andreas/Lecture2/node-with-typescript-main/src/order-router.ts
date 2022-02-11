import {Router} from 'express'
import {Orders} from './orders-controller'

const router = Router()

router.get('/', Orders.list)
router.get('/:uid', Orders.list)
router.post('/', Orders.create)
router.put('/:uid', Orders.overwrite)
router.patch('/:uid', Orders.update)
router.delete('/:uid', Orders.remove)

export const orders = router




/*
PUT /orders/:uid
UPDATE /orders/:uid
DELETE /orders/:uid
*/