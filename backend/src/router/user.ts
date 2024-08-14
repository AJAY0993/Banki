import express from "express"
import { getMe } from "./../controller/userController"
import isAuthenticated from "../middleware/auth"

const userRouter = express.Router()

userRouter.get("/me", isAuthenticated, getMe)

export default userRouter
