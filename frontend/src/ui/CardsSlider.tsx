import { useEffect, useState } from "react"
import Button from "./Button"
import FlashCard from "./FlashCard"
import cards from "../utils/data"
import socket from "./../services/socket"
import { useLocation, useParams } from "react-router-dom"

const negativeIndexCard = {
  question: "Session has not been started yet",
  type: "info"
}

function CardsSlider({ host }: { host: boolean }) {
  const { roomId } = useParams()
  const [index, setIndex] = useState<number>(-1)
  const location = useLocation()
  const copyInvitationLink = () => {
    const id = location.pathname.split("/").pop()
    navigator.clipboard.writeText(id || "")
  }
  useEffect(() => {
    socket.on("event:next", (index) => {
      parseInt(index)
      setIndex(index)
    })
  }, [])

  const showNext = () => {
    socket.emit("event:next", roomId)
  }

  // useEffect(() => {
  //   if (index !== -1) {
  //     const utterance = new SpeechSynthesisUtterance(cards[index].question)
  //     if (speechSynthesis.speaking) return () => speechSynthesis.cancel()
  //     speechSynthesis.speak(utterance)
  //   }
  // }, [index])
  return (
    <div className=" lg:w-[50rem]">
      <FlashCard flashCard={index === -1 ? negativeIndexCard : cards[index]} />
      {host && (
        <div className="mt-4 flex gap-4 justify-center">
          <Button onClick={showNext}>{index === -1 ? "Start" : "Next"}</Button>
          <Button onClick={copyInvitationLink}>Copy room id</Button>
        </div>
      )}
    </div>
  )
}

export default CardsSlider
