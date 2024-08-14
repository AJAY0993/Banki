import { useAppSelector } from "../../redux/hooks"
import Button from "../../ui/Button"
import { getIsAuthenticated } from "./authSlice"
import useSignout from "./useSignout"

function AuthNav() {
  const { signout, isPending } = useSignout()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  return (
    <div className="flex items-center justify-center gap-2 lg:gap-4">
      {isAuthenticated ? (
        <Button onClick={signout} disabled={isPending}>
          Logout
        </Button>
      ) : (
        <>
          <Button to="/signin">Login</Button>
          <Button type="transparent" to="/signup">
            Signup
          </Button>
        </>
      )}
    </div>
  )
}

export default AuthNav
