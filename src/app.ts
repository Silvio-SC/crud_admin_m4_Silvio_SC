import "express-async-errors"
import express, { Application, json } from 'express'
import { courseRouter, loginRouter, userRouter } from './routers'
import middleware from './middleware'

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/login", loginRouter)
app.use("/courses", courseRouter)

app.use(middleware.handleErrors)

export default app
