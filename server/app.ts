/// <reference types="node" />
import MongoStore from 'connect-mongo'
import express, { NextFunction, Request, Response } from 'express'
import session from 'express-session'
import createHttpError, { isHttpError } from 'http-errors'
import morgan from 'morgan'
import { requiresAuth } from './middleware/auth'
import notesRoutes from './routes/notes'
import usersRoutes from './routes/users'
import env from './utils/validateEnv'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGODB_URI,
    }),
  }),
)

app.use('/api/notes', requiresAuth, notesRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpont not found!'))
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error)
  let errorMessage = 'An unknown error occurred'
  let statusCode = 500
  if (isHttpError(error)) {
    statusCode = error.status
    errorMessage = error.message
  }
  res.status(statusCode).json({ error: errorMessage })
})

export default app
