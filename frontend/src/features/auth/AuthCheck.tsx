import { ReactNode, useEffect } from "react"
import useCheckIsUserAuthenticatedUser from "./useCheckIsAuthenticated"
import FullpageLoader from "../../ui/FullpageLoader"

function AuthCheck({ children }: { children: ReactNode }) {
  const { getIsUserAuthenticated, isChecking } =
    useCheckIsUserAuthenticatedUser()
  useEffect(() => {
    getIsUserAuthenticated()
  }, [])

  if (isChecking) return <FullpageLoader />
  return children
}

export default AuthCheck
