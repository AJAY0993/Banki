import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import BankiRoom from "./pages/Room"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import AuthCheck from "./features/auth/AuthCheck"
import SocketProvider from "./context/socketContext"
import HostRoom from "./features/room/Host"
import AppLayout from "./ui/AppLayout"

function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <AuthCheck>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/:roomId" element={<BankiRoom />} />
              <Route
                path="/host/:roomId"
                element={
                  <AppLayout>
                    <HostRoom />
                  </AppLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </AuthCheck>
      </SocketProvider>
    </QueryClientProvider>
  )
}

export default App
