import { readFile } from 'fs'
import { join } from 'path'
import {sign, verify} from 'jsonwebtoken'
import { json, Request, Response } from 'express'
import mongoose from 'mongoose'

import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'
import { Name, userSchema } from '../models/user'

const PUBLIC_KEY_PATH = join(__dirname,'..','..','src','keys','public','auth-rsa256.key.pub')
const PRIVATE_KEY_PATH = join(__dirname,'..','..','src','keys','private','auth-rsa256.key')

const X5U = 'http://127.0.0.1:3000/auth-rsa256.key.pub' // Tobias 

const usersConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/assignment1-users') // Tobias
const UserModel = usersConnection.model('User', userSchema)


export const getToken = async (req: Request, res: Response) => {
    
    const {email, password} = req.body
    let user = await UserModel.findOne({email}).exec()
    
    if(user) {
        if(await user.password.isPasswordValid(password)) {
            readFile(PRIVATE_KEY_PATH, (err, privateKey) => {
                if(err) {
                    res.sendStatus(500)
                } else {
                    const rights = user.accessRights
                    
                    if(rights === 'manager' || rights === 'clerk') {
                        sign({email, accessRights: rights}, privateKey, {expiresIn: '1h', header: {alg: 'RS256', x5u: X5U}}, (err, token) => {
                            if(err) {
                                res.status(500).json({
                                    message: err.message
                                })
                            } else {
                                res.json({token})
                            }
                        })
                    } else {
                        sign({email, accessRights: 'guest'}, privateKey, {expiresIn: '1h', header: {alg: 'RS256', x5u: X5U}}, (err, token) => {
                            if(err) {
                                res.status(500).json({
                                    message: err.message
                                })
                            } else {
                                res.json({token})
                            }
                        }) 
                    }
                }

            })
        }
    }
}

export const listUsers = async (req: Request, res: Response) => {  
    let result = await UserModel.find({}).distinct('_id').exec()
    return res.status(200).send(result)
}

// Inspired by the create() endpoint in: https://github.com/bvda/swabe-01/blob/main/examples/lesson-03/authentication/src/controller/user.controller.ts
// Which is authored by Brian Vestergaard Danielsen
export const createUser = async (req: Request, res: Response) => {
    const {email, password, name, accessRights} = req.body
    if(await userExists(email)){
        res.status(400).json({
            "message": "A user has already been created with this email adress."
        })
    } else {
        let salt = await randomBytes(SALT_LENGTH)
        let hashed = await pbkdf2(password, salt.toString('hex'), ITERATIONS, KEY_LENGTH, DIGEST)
        let user = newUser(email, name, accessRights)
        user.password.setPassword(hashed.toString('hex'), salt.toString('hex'))
        await user.save()
        res.json(user)
    }
}

export const viewUser = async (req: Request, res: Response) => {
    const {uid} = req.params
    let result = await UserModel.find({_id: uid})
    res.json(result)
}

// Helper methods
const userExists = (email: string) => UserModel.findOne({ email }).exec()

const newUser = (email: string, name: Name, accessRights: string) => new UserModel({ 
    email, 
    name,
    accessRights, 
    password: {
      hash: '',
      salt: ''
    }
  })