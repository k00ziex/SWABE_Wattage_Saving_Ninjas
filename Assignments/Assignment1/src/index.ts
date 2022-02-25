import express from 'express'
import { readFile } from 'fs'
import { join } from 'path'
import { AuthenticationRouter } from './routers/user_router'
import { DataseedingRouter } from './routers/seeding_router'
import { decode, verify} from 'jsonwebtoken'

const PUBLIC_KEY_PATH = join(__dirname,'..','..','Assignment1','src','keys','public','auth-rsa256.key.pub')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use('', AuthenticationRouter)
app.use('', DataseedingRouter)

app.use((req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  console.log(token)
  if(token) {
    readFile(PUBLIC_KEY_PATH, (err, publicKey) => {
      if(err) {
        console.log(err)
        res.sendStatus(418)
      } else {
        verify(token, publicKey, { complete: true }, (err, decoded) => {
          if(err) {
            res.status(400).json({
              message: err.message
            })
          } else {
            req.body.rights = decoded.payload["accessRights"]
            next()
          }
        })
      }
    })
  }
})

app.get('/protected', (req, res) => {
  console.log(req)
  console.log(req.body.rights)
  res.json({
    message: 'Such authenticate. Very allow. So access. Wow!'
  })
})

app.listen(port, () => {
    console.log(`Running 'authentication' on ${port}`)
  })

