import { useMutation } from "@tanstack/react-query"
import { signout as signoutReducer, User } from "./authSlice"
import toast from "react-hot-toast"
import { signout as signoutApi } from "../../services/authApi"
import { useAppDispatch } from "../../redux/hooks"
import { useNavigate } from "react-router"

function useSignout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    mutate: signout,
    isPending,
    isError,
    error
  } = useMutation({
    mutationFn: signoutApi,
    onSuccess: () => {
      toast.success("signed out")
      dispatch(signoutReducer())
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return { signout, isPending, isError, error }
}

export default useSignout
