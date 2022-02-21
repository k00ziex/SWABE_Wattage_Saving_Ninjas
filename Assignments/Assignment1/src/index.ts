import express from 'express'

import { AuthenticationRouter } from './routers/user_router'
import { DataseedingRouter } from './routers/seeding_router'

const app = express()
const port = 3000

app.use(express.static('public'))

app.use('', AuthenticationRouter)
app.use('', DataseedingRouter)



app.listen(port, () => {
    console.log(`Running 'authentication' on ${port}`)
  })

