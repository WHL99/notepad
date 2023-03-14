/// <reference types="node" />

import mongoose from 'mongoose'
import 'dotenv/config'

import app from './app'

const port = process.env.PORT
const mongoDB_URI = process.env.MONGODB_URI

// connect會返回promise 所以用.then來處理promise
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