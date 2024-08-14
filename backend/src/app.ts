import express from "express"
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import mongoSanitize from "express-mongo-sanitize"
import compression from "compression"
import authRouter from "./router/auth"
import userRouter from "./router/user"

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.WHITELIST_ORIGIN, credentials: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(mongoSanitize())
app.use(compression())

app.get("/", (_, res) => res.send("hello"))
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)

export default app
