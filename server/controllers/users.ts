import { RequestHandler } from 'express'
import createHttpError from 'http-errors'
import UserModel from '../models/user'
import bcrypt from 'bcrypt'

const saltRounds = 10

interface SignUpBody {
  username?: string
  email?: string
  password?: string
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const email = req.body.email
  const password = req.body.password
  try {
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec()
    const existingEmail = await UserModel.findOne({ email: email }).exec()
    if (!username || !email || !password) {
      throw createHttpError(400, 'Parameters are missing...')
    }
    if (existingUsername) {
      throw createHttpError(409, 'Username exists.')
    }
    if (existingEmail) {
      throw createHttpError(409, 'Email exists.')
    }
    if (!email.includes('@')) {
      throw createHttpError(409, 'This is not a valid Email.')
    }

    const salt = bcrypt.genSaltSync(saltRounds)
    const passwordHashed = bcrypt.hashSync(password, salt)
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    })
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}
