import { AxiosError, AxiosResponse } from "axios"
import axios from "../utils/axios"

export interface SigninInput {
  email: string
  password: string
}
export interface SignupInput {
  username?: string
  email: string
  password: string
}

export const signin = async ({ email, password }: SigninInput) => {
  try {
    const res = await axios("auth/signin", {
      method: "POST",
      data: {
        email,
        password
      }
    })
    return res.data.user
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    }
  }
}

export const signup = async ({ email, password, username }: SignupInput) => {
  try {
    const res: AxiosResponse = await axios("auth/signup", {
      method: "POST",
      data: {
        email,
        password,
        username
      }
    })
    return res.data.user
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    }
  }
}

export const signout = async () => {
  try {
    await axios("auth/signout", {
      method: "POST"
    })
  } catch (error) {
    console.log(error)
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.message)
    }
  }
}
