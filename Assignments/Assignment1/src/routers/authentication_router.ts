// Inspired by Brian Vestergaard Danielsen's implementation of an authentication router - Lecturer for SWABE
// https://github.com/bvda/swabe-01/blob/main/examples/lesson-03/authentication/src/router/authentication.router.ts

import { Router, json } from 'express'
import { listUsers, viewUser, createUser, getToken } from '../controllers/authentication_controller'

const router = Router()
router.use(json())

router.get('/users', listUsers)
router.get('/users/{:uid}', viewUser)
router.post('/user', createUser)
router.post('/login', getToken)

export { router as AuthenticationRouter }