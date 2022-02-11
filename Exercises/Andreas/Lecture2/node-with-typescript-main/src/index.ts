import express from 'express'
import {orders} from './order-router'
import { utils } from './utils-router'


const app = express()
const port = 3000

app.use(express.json())

app.use('/orders', orders)
app.use('/utils', utils)

app.listen(3000, () => {
  console.log(`Server running 'hello-mongoose' on ${port}`)
})