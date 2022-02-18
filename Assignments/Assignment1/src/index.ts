import express from 'express'

import { AuthenticationRouter } from './routers/user_router'

const app = express()
const port = 3000

app.use(express.static('public'))

app.use('', AuthenticationRouter)


app.listen(port, () => {
    console.log(`Running 'authentication' on ${port}`)
  })

