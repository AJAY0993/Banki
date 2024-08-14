import { useNavigate } from "react-router-dom"
import Button from "../../ui/Button"

function JoinRoom() {
  const navigate = useNavigate()
  const join = () => {
    const roomId = prompt("Enter room id")
    if(roomId === null) return
    navigate(`/${roomId}`)
  }
  return (
    <Button size="xl" onClick={join}>
      Join
    </Button>
  )
}

export default JoinRoom
