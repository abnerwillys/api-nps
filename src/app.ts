import express from 'express'
import 'express-async-errors'
import 'reflect-metadata'
import createConnection from './database'
import handleError from './middlewares/handleError'
import { router } from './routes'

createConnection()
const app = express()

app.use(express.json())
app.use(router)
app.use(handleError)

export { app }

