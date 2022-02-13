import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { readFile } from 'fs/promises';

import { orderSchema } from './order'

const orderConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/orders')
const orderModel = orderConnection.model('Order', orderSchema)

const bootstrap = async (req: Request, res: Response) => {
    //await orderModel.deleteMany({}).exec()

    let orders = await readFile('./MOCK_DATA_ORDERS.json', 'utf-8')
    let orderResult = await orderModel.insertMany(JSON.parse(orders))

    res.json({
        transactions: {
          ids: orderResult.map(t => t._id),
          cnt: orderResult.length,
        }
    })
}

export const Utils = {
    bootstrap
}