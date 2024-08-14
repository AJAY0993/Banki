import Button from "../../ui/Button"
import socket from "../../services/socket"
import { useSocket } from "../../context/socketContext"
import { useAppSelector } from "../../redux/hooks"
import { getIsAuthenticated } from "../auth/authSlice"
import { useNavigate } from "react-router-dom"

function CreateRoom() {
  const { isConnected } = useSocket()
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const navigate = useNavigate()

  const createRoom = () => {
    if (!isAuthenticated) {
      return navigate("/signin")
    }
    if (isConnected) {
      socket.emit("event:createRoom")
      socket.on("event:roomCreated", (roomId) => navigate(`/host/${roomId}`))
      socket.on("event:userJoined", () =>
        console.log("Someone joined the brunch")
      )
      socket.on("event:userExited", () =>
        console.log("Someone joined the brunch")
      )
    }
  }

  return (
    <Button size="xl" onClick={createRoom}>
      Host
    </Button>
  )
}

export default CreateRoom
