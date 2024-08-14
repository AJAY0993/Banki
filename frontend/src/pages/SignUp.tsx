import { Navigate } from "react-router"
import AuthForm from "../features/auth/AuthForm"
import { getIsAuthenticated } from "../features/auth/authSlice"
import { useAppSelector } from "../redux/hooks"

function SignUp() {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  if (isAuthenticated) return <Navigate to="/" replace />

  return (
    <div className="bg-neutral-800 min-h-screen flex items-center justify-center">
      <div className="flex ">
        <div className="hidden md:block"></div>
        <AuthForm type="signup" />
      </div>
    </div>
  )
}

export default SignUp
