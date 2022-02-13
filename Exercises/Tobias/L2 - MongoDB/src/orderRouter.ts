import express from 'express';
import {Orders} from './orderController';
const router = express.Router();

router.use(express.json()); // No bodies can be received without this. 

router.use(( req, res, next)=> {
    console.log("OrderRouter received request:" + res + "\nAt time: " + Date.now());
    next();
});

// define the home page route
router.get('', Orders.list);
  // define the about route
router.post('', Orders.create)

router.get('/:uid', Orders.read);

router.put('/:uid', Orders.overwrite);

router.patch('/:uid', Orders.update);

router.delete('/:uid', Orders.remove);

export const orderRouter = router;