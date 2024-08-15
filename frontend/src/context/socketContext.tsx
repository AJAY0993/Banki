import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import socket from "../services/socket"
import { Socket } from "socket.io-client"

interface SocketProviderProps {
  children: ReactNode
}

interface SocketContextProps {
  isConnected: boolean
  socket: Socket
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined)

function SocketProvider({ children }: SocketProviderProps) {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected)
  const value = { isConnected, socket }
  useEffect(() => {
    socket.connect()
    const handleConnect = () => setIsConnected(true)
    const handleDisconnect = () => setIsConnected(false)

    socket.on("connect", handleConnect)
    socket.on("disconnect", handleDisconnect)

    // Cleanup on unmount
    return () => {
      socket.off("connect", handleConnect)
      socket.off("disconnect", handleDisconnect)
    }
  }, [])
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  )
}

export function useSocket(): SocketContextProps {
  const context = useContext(SocketContext)
  if (context === undefined) throw new Error("Used outside socket provider")
  return context
}
export default SocketProvider
