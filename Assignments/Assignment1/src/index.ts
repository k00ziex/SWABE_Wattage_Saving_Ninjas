import express from 'express'
import { readFile } from 'fs'
import { join } from 'path'
import { AuthenticationRouter } from './routers/user_router'
import { RoomRouter } from './routers/room_router'
import { DataseedingRouter } from './routers/seeding_router'
import { decode, verify, JwtPayload, Jwt} from 'jsonwebtoken'

const PUBLIC_KEY_PATH = join(__dirname,'..','..','Assignment1','src','keys','public','auth-rsa256.key.pub')
const app = express()
const port = 3000

app.use(express.static('public'))

app.use( (req, res, next) => {
  console.log("\nReceived request: " + req.method + " on " + req.url);
  next();
});

app.use('', AuthenticationRouter)
app.use('', DataseedingRouter)

app.use((req, res, next) => {
  const token = req.get('authorization')?.split(' ')[1]
  if(token) {
    readFile(PUBLIC_KEY_PATH, (err, publicKey) => {
      if(err) {
        console.log(err)
        res.sendStatus(418)
      } else {
        verify(token, publicKey, { complete: true }, (err, decoded) => {
          if(err) {
            res.status(401).json({
              message: err.message
            })
          } else {
              var payload = decoded?.payload as JwtPayload
              if(payload == null) { throw new Error("Øv")} // Fix this
              req.body.rights = payload["accessRights"]
              console.log("Rights: " + req.body.rights);
              next()
          }
        })
      }
    })
  }
});

app.use('', RoomRouter)


app.get('/protected', (req, res) => {
  console.log(req)
  console.log(req.body.rights)
  res.json({
    message: 'Such authenticate. Very allow. So access. Wow!'
  })
})

app.listen(port, () => {
    console.log(`Running 'SWABE Assignment 1' on ${port}`)
  })

