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

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId
  try {
    if (!authenticatedUserId) {
      throw createHttpError(401, 'User is not authenticated.')
    }
    const authenticatedUser = await UserModel.findById(authenticatedUserId)
      .select('+email')
      .exec()
    res.status(200).json(authenticatedUser)
  } catch (error) {
    next(error)
  }
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
      throw createHttpError(409, 'This is not a valid Email.')
    }
    const salt = bcrypt.genSaltSync(saltRounds)
    const passwordHashed = bcrypt.hashSync(password, salt)
    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    })
    // need a type configure folder
    req.session.userId = newUser._id
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

interface LogInBody {
  username?: string
  password?: string
}

export const logIn: RequestHandler<
  unknown,
  unknown,
  LogInBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  try {
    if (!username || !password) {
      throw createHttpError(400, 'Parameters are missing...')
    }

    const user = await UserModel.findOne({ username: username })
      .select('+email +password')
      .exec()
    if (!user) {
      throw createHttpError(401, 'Invalid credentials.')
    }
    const passwordMatch = await bcrypt.compare(password, user.password!)

    if (!passwordMatch) {
      throw createHttpError(401, 'Invalid credentials.')
    }
    req.session.userId = user._id
    res.status(201).json(user)
  } catch (error) {
    next(error)
  }
}

export const logOut: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    error ? next(error) : res.sendStatus(200)
  })
}
