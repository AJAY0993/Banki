import { useEffect, useState } from "react"
import CardsSlider from "../../ui/CardsSlider"
import Discussion from "../discussion/Discussion"
import LiveChat from "../live-chat/Live-chat"
import { useSocket } from "../../context/socketContext"
import { useParams } from "react-router-dom"

function HostRoom() {
  const [loading, setLoading] = useState<boolean>(true)
  const { roomId } = useParams()
  const { socket } = useSocket()

  useEffect(() => {
    socket.emit("event:joinRoom", roomId)
    socket.on("event:roomJoined", () => {
      setLoading(false)
    })

    socket.emit("event:joinedRoom", roomId)
  }, [])

  if (loading) return "Wait for a while"
  return (
    <div>
      <div className="flex mt-2 lg:mt-4 justify-between items-start gap-4">
        <div className=" flex flex-col gap-4">
          <CardsSlider host={true} />
          <Discussion />
        </div>
        <LiveChat />
      </div>
    </div>
  )
}

export default HostRoom
