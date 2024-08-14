import { Request, Response } from "express"
import { getUserById } from "../models/user"

export const getMe = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.body.user
    const user = await getUserById(id)
    return res.status(200).json({
      status: "success",
      message: "Its your profile",
      user
    })
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "something went wrong"
    })
  }
}
