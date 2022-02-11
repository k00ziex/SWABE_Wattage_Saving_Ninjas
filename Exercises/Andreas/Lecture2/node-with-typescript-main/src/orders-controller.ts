import { Request, Response } from 'express'
import mongoose from 'mongoose'

const transactionsConnection = mongoose.createConnection('mongodb://localhost:27017/orders')

const list = async (req: Request, res: Response) => {
    res.json("Orders listed");
}

const create =  async (req: Request, res: Response) => {
    res.json("ID Created")
}

const read = async (req: Request, res: Response) => {
    res.json("Here is a single order with an ID")
}

const overwrite = async (req: Request, res:Response) => {
      res.json("You have now PUT an order")
}

const update = async (req: Request, res:Response) => {
    res.json("You have now PATCH an order")
}

const remove = async (req: Request, res:Response) => {
    res.json("You have now deleted an order")
}

export const Orders = {
    list, create, read, overwrite, update, remove
}