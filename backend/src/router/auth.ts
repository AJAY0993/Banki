import express from "express"
import validate from "../middleware/validate"
import { signin, signout, signup } from "../controller/authController"
import { signInInput, signUpInput } from "../zod/schema"
import isAuthenticated from "../middleware/auth"

const authRouter = express.Router()

authRouter.post("/signup", validate(signUpInput), signup)
authRouter.post("/signin", validate(signInInput), signin)
authRouter.post("/signout", isAuthenticated, signout)

export default authRouter
