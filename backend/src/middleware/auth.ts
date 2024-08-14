import { Request, Response, NextFunction } from "express"
import jwt, { JsonWebTokenError } from "jsonwebtoken"

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "Please provide credentials"
      })
    }
    try {
      console.log("before decode")
      const decode = await jwt.verify(token, process.env.JWT_SECRET)
      console.log(decode)
      // @ts-ignore
      req.body.user = { id: decode.id }
    } catch (error) {
      console.log(error)
      if (error instanceof JsonWebTokenError) {
        return res.status(401).json({
          satus: "failed",
          message: error.message
        })
      }
      return res.status(500).json({
        satus: "error",
        message: "something went wrong"
      })
    }

    next()
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "something went wrong"
    })
  }
}

export default isAuthenticated
