import { useEffect, useState } from "react"
import CardsSlider from "../../ui/CardsSlider"
import Discussion from "../discussion/Discussion"
import LiveChat from "../live-chat/Live-chat"
import { useSocket } from "../../context/socketContext"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks"
import { getSignedInUser } from "../auth/authSlice"

function BankiRoom() {
  const [loading, setLoading] = useState<boolean>(true)
  const [available, setAvailable] = useState<boolean>(false)
  const { roomId } = useParams()
  const { socket } = useSocket()
  const user = useAppSelector(getSignedInUser)
  const userId = user?._id || user?.id
  useEffect(() => {
    socket.emit("event:checkRoom", roomId)
    socket.on("event:roomChecked", ({ available }: { available: boolean }) => {
      if (available) {
        setAvailable(true)
        socket.emit("event:joinRoom", {
          roomId,
          userId,
          username: user?.username
        })

        socket.on("event:roomJoined", () => {
          setLoading(false)
        })
      } else {
        setLoading(false)
        setAvailable(false)
      }
    })
    socket.emit("event:joinedRoom", roomId)
    return () => {
      socket.removeListener("event:roomJoined")
      socket.removeListener("event:roomChecked")
    }
  }, [])
  if (loading) return "Wait for a while"
  if (!available) return `No room found with id ${roomId}`
  return (
    <div>
      <div className="flex mt-2 lg:mt-4 justify-between items-start gap-4">
        <div className=" flex flex-col gap-4">
          <CardsSlider host={false} />
          <Discussion />
        </div>
        <LiveChat />
      </div>
    </div>
  )
}

export default BankiRoom
