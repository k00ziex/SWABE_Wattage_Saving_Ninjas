import { readFile } from 'fs'
import { join } from 'path'
import { Request, Response } from 'express'
import mongoose from 'mongoose'

import { randomBytes, pbkdf2, SALT_LENGTH, DIGEST, ITERATIONS, KEY_LENGTH, ROUNDS } from '../utils/auth-crypto'
import { Name, userSchema } from '../models/user'

const usersConnection = mongoose.createConnection('mongodb://localhost:27017/assignment1-users')
const UserModel = usersConnection.model('User', userSchema)


export const getToken = async (req: Request, res: Response) => {

}

export const listUsers = async (req: Request, res: Response) => {  
    let result = await UserModel.find({}).distinct('_id').exec()
    return res.status(200).send(result)
}

// Inspired by the create() endpoint in: https://github.com/bvda/swabe-01/blob/main/examples/lesson-03/authentication/src/controller/user.controller.ts
// Which is authored by Brian Vestergaard Danielsen
export const createUser = async (req: Request, res: Response) => {
    const {email, password, name} = req.body
    if(await userExists(email)){
        res.status(400).json({
            "message": "A user has already been created with this email adress."
        })
    } else {
        let salt = await randomBytes(SALT_LENGTH)
        let hashed = await pbkdf2(password, salt.toString('hex'), ITERATIONS, KEY_LENGTH, DIGEST)
        let user = newUser(email, name)
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

const newUser = (email: string, name: Name) => new UserModel({ 
    email, 
    name, 
    password: {
      hash: '',
      salt: ''
    }
  })