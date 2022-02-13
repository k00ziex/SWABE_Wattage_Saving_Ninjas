import { Request, Response } from 'express'
import mongoose from 'mongoose'

import {orderSchema} from './order'
const orderConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/orders');
const OrderModel = orderConnection.model('Order', orderSchema);

const list = async (req: Request, res: Response) => {
    const { src, dst, f, t } = req.query
  
    let filter = { }
  
    if(src) {
      filter = { src }
    }
  
    if(dst) {
      filter = { ...filter, dst }
    }
  
    if(f && t) {
      filter = { ...filter, ts: { $gt: f, $lt: t }}
    } else {
      if(f) {
        filter = { ...filter, ts: { $gt: f }}
      }
      if(t) {
        filter = { ...filter, ts: { $lt: t }}
      }
    }
    
    let result = await OrderModel.find(filter, { __v: 0 }).lean()
    res.json(result);
  }

  const create = async(req: Request, res: Response) => {
    try {
      console.debug("*****************************************************************")
      console.debug ("Got creation request:\n"+req.body);
      console.debug("*****************************************************************")
      let {id} = await new OrderModel(req.body).save();
      res.json({id});
    
    } catch (error) {
      console.error("oh bugger");
      res.sendStatus(500);
    }
      }

  const read = async (req: Request, res: Response) => {
    const { uid } = req.params
    let result = await OrderModel.find({ _id: uid }, { __v: 0}).exec()
    res.json(result)
  }

  const overwrite = async (req: Request, res:Response) => {
    const { uid } = req.params
    const body = req.body
    let result = await OrderModel.findOne({ _id: uid}, {__v: 0}).exec()
    if(result) {
      let resp = result.overwrite(body)
      res.json(resp)
    } else {
      res.sendStatus(404)
    }
  }

  const update = async (req: Request, res: Response) => {
    const { uid } = req.params
    console.log(uid)
    let result = await OrderModel.updateOne({_id: uid }, { $set: { amnt: 100, src: '123', dst: '321' }}).exec()
    res.json({uid, result})
  }
  
  const remove = async (req: Request, res: Response) => {
  const { uid } = req.params
    let result = await OrderModel.deleteOne({ _id: uid })
    res.json(result)
  };

  export const Orders = {
      list, create, read, overwrite, update, remove
  };