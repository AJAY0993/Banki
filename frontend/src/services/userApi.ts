import { AxiosError, AxiosResponse } from "axios"
import axios from "../utils/axios"
import { User } from "../features/auth/authSlice"

export const getAuthenticatedUser = async (): Promise<User | undefined> => {
  try {
    const res: AxiosResponse<{ user: User }> = await axios("users/me")
    return res.data.user
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message)
    }
  }
}
