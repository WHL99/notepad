/// <reference types="node" />

import express, { NextFunction, Response, Request } from 'express'
import morgan from 'morgan'
import notesRoutes from './routes/notes'
import usersRoutes from './routes/users'

import createHttpError, { isHttpError } from 'http-errors'

const app = express()

// express.json() 是 middleware，用於解析以 JSON 格式發送的request body。
// 當您在程式碼中使用 app.use(express.json()) 時，它會告訴您的 Express 應用程式使用這個中介軟體函數來解析任何傳入的請求。
// 當收到請求時，express.json() 中介軟體函數會解析請求主體中的 JSON 資料，並將解析後的資料加入 req.body 中。
// 這讓您可以在路由或控制器中輕鬆地使用 JSON 資料，因為您可以直接從 req.body 物件中取得解析後的資料。
// 如果沒有 express.json() 中介軟體，您就需要手動使用 JSON 解析器 (例如 JSON.parse()) 解析請求主體，這可能很繁瑣且容易出錯。
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/notes', notesRoutes)
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
