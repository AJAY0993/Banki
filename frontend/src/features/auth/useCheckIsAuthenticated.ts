import { useMutation } from "@tanstack/react-query"
import { getAuthenticatedUser as getAuthenticatedUserApi } from "../../services/userApi"
import { signin, signout, User } from "./authSlice"
import { useState } from "react"
import toast from "react-hot-toast"
import { useAppDispatch } from "./../../redux/hooks"

function useCheckIsUserAuthenticatedUser() {
  const [isChecking, setIsChecking] = useState(true)
  const dispatch = useAppDispatch()
  const { mutate: getIsUserAuthenticated } = useMutation({
    mutationFn: getAuthenticatedUserApi,
    onSuccess: (data: User | undefined) => {
      if (data) {
        dispatch(signin(data))
        toast.success(`Welcome back  ${data.username}`)
      }
    },
    onError: (err) => {
      console.log(err)
      dispatch(signout())
      console.log(err)
    },
    onSettled: () => setIsChecking(false)
  })

  return { getIsUserAuthenticated, isChecking }
}

export default useCheckIsUserAuthenticatedUser
