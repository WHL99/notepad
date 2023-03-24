/// <reference types="node" />
import 'dotenv/config'
import mongoose from 'mongoose'
import app from './app'
import env from './utils/validateEnv'

const port = env.PORT
const mongoDB_URI = env.MONGODB_URI

mongoose
  .connect(mongoDB_URI!)
  .then(() => {
    console.log('Database is connected!!')
  })
  .catch((err: Error) => {
    console.error('Oops!', err)
  })

app.listen(port, () => {
  console.log('Listening at port: ', port)
})
