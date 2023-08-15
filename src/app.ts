import express, { Application, json } from 'express'
import { courseRouter, loginRouter, userRouter } from './routers'

const app: Application = express()
app.use(json())

app.use("/users", userRouter)
app.use("/login", loginRouter)
app.use("/courses", courseRouter)

export default app
