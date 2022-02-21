// Heavily inspured by Brian Vestergaard Danielsen's user model - Lecturer for SWABE
// https://github.com/bvda/swabe-01/blob/main/examples/lesson-03/authentication/src/model/user.model.ts

import { Schema } from 'mongoose'
import { DIGEST, ITERATIONS, KEY_LENGTH, pbkdf2 } from '../utils/auth-crypto'

export interface User {
  name: Name
  password: Password
  email: string
  accessRights: String
}

export interface Name {
  first: string
  middle?: string
  last: string
}

export interface Password {
  hash: string
  salt: string
  setPassword(hash: string, salt: string): void
  isPasswordValid(password: string): boolean
}

export const NameSchema = new Schema<Name>({
  first: { type: String, required: true },
  middle: { type: String }, 
  last: { type: String, required: true}
})

export const PasswordSchema = new Schema<Password> ({
  hash: { type: String, required: true },
  salt: { type: String, required: true }
})

PasswordSchema.methods.isPasswordValid = async function(password: string) {
  const hash = await pbkdf2(password, this.salt, ITERATIONS, KEY_LENGTH, DIGEST)
  return this.hash === hash.toString('hex')
}

PasswordSchema.methods.setPassword = function(hash: string, salt: string) {
  this.hash = hash
  this.salt = salt
}

export const userSchema = new Schema<User>({
  name: { type: NameSchema, required: true }, 
  password: { type: PasswordSchema, required: true },
  email: { type: String, required: true },
  accessRights: {type: String}
})

