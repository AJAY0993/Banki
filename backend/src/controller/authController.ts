import { Request, Response } from "express"
import UserModel, { createUser, getUserByEmail } from "../models/user"
import jwt from "jsonwebtoken"

export const signup = async (req: Request, res: Response) => {
  try {
    const user = await getUserByEmail(req.body.email)
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "Email already exist"
      })
    }
    const newUser = await createUser(req.body)
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "30 days"
    })
    res.cookie("jwt", token, {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
      sameSite:"none"
  
    })
    res.status(201).json({
      status: "success",
      message: "Signed up successfully"
    })
  } catch (error) {
    return res.json({
      status: "error",
      message: "something went wrong"
    })
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body
    const user = await UserModel.findOne({ email }).select({
      username: true,
      password: true,
      email: true
    })
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "incorrect email or password"
      })
    }
    if (!(await user.validatePassword(password, user.password))) {
      return res.status(401).json({
        status: "failed",
        message: "incorrect email or password"
      })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", {
      expiresIn: "30 days"
    })
    res.cookie("jwt", token, {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
      sameSite:"none"
    })
    res.status(201).json({
      status: "success",
      message: "Signed in successfully",
      user
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "something went wrong",
      error
    })
  }
}

export const signout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: true,
      sameSite:"none"
    })
    res.status(201).json({
      status: "success",
      message: "Signed out successfully"
    })
  } catch (error) {
    return res.json({
      status: "error",
      message: "something went wrong"
    })
  }
}
