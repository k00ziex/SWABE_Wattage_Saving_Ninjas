import express from 'express'

import { AuthenticationRouter } from './routers/user_router'
import { RoomRouter } from './routers/room_router'

const app = express()
const port = 3000

app.use(express.static('public'))

app.use('', AuthenticationRouter)
app.use('', RoomRouter)

app.listen(port, () => {
    console.log(`Running 'SWABE Assignment 1' on ${port}`)
  })

