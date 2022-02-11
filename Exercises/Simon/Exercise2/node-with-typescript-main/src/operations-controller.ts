import {Request, Response} from 'express'
import mongoose from 'mongoose'

import {schema} from './orders'
import {readFile} from 'fs/promises'

const ordersConnection = mongoose.createConnection('mongodb://localhost:27017/orders')
const OrderModel = ordersConnection.model('Order', schema)

const list = async(req: Request, res: Response) => {
    let response = "Hej"
    res.json(response)
}

const create = async(req: Request, res: Response) => {

}

const read = async(req: Request, res: Response) => {

}

const overwrite = async(req: Request, res: Response) => {

}

const update = async(req: Request, res: Response) => {

}

const remove = async(req: Request, res: Response) =>  {

}

const bootstrap = async(req: Request, res: Response) => {
    await OrderModel.deleteMany({}).exec()

    let orders = await readFile('./MOCK_DATA_MATERIALS.json', 'utf-8')
    let orderResult = await OrderModel.insertMany(JSON.parse(orders))

    res.json({
        orders: {
            ids: orderResult.map(o => o._id),
            cnt: orderResult.length
        }
    })
}

export const Operations = {list, create, read, overwrite, update, remove, bootstrap}