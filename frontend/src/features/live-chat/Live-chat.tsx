import { FormEvent, useEffect, useRef, useState } from "react"
import LiveMessage from "./LiveMessage"
import messageArrayElement from "../../types/message"
import { useAppSelector } from "../../redux/hooks"
import { getIsAuthenticated, getSignedInUser } from "../auth/authSlice"
import Button from "../../ui/Button"
import SendMessage from "./../../types/send-message"
import { useParams } from "react-router-dom"
import { useSocket } from "../../context/socketContext"

function LiveChat() {
  const isAuthenticated = useAppSelector(getIsAuthenticated)
  const [hide, setHide] = useState<boolean>(true)
  const [messages, setMessages] = useState<messageArrayElement[]>([])
  const {socket} = useSocket()
  useEffect(() => {
    socket.on("event:message", (newMessage: messageArrayElement) => {
      setMessages((s) => [...s, newMessage])
    })
    return () => {
      socket.removeListener("event:message")
    }
  }, [])
  if (!isAuthenticated)
    return (
      <div>
        <Button to="/signin">Sign to chat live</Button>
      </div>
    )
  return (
    <aside className="w-full">
      <button
        className="rounded-full w-full text-center border-2 py-2 text-white font-medium hover:bg-blue-600 hover:text-white"
        onClick={() => setHide((s) => !s)}
      >
        {hide ? " Show live chat" : "Close live chat"}
      </button>
      {!hide && (
        <ChatBox>
          {messages.map((m) => (
            <LiveMessage message={m} />
          ))}
        </ChatBox>
      )}
    </aside>
  )
}

function ChatBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[400px] flex flex-col justify-between">
      <div className="w-full rounded-lg flex-grow text-neutral-50 lg:mt-4 bg-neutral-800 max-h-[25rem] overflow-scroll overflow-x-hidden ">
        {children}
      </div>
      <SendMessageForm />
    </div>
  )
}

function SendMessageForm() {
  const { roomId } = useParams()
  const user = useAppSelector(getSignedInUser)
  const messageRef = useRef<HTMLInputElement>(null)
  const {socket} = useSocket()

  // need to fix it later
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (messageRef.current?.value === "") return
    const payload: SendMessage = {
      roomId: roomId || "",
      message: messageRef.current?.value || "",
      userId: user?._id || user?.id || "",
      username: user?.username || ""
    }
    if (messageRef.current) {
      messageRef.current.value = ""
    }

    socket.emit("event:message", payload)
  }
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input
          className="rounded-full w-full bg-neutral-800 py-2 px-3 text-neutral-50 mt-4"
          ref={messageRef}
          placeholder="Chat..."
        />
      </form>
    </div>
  )
}

export default LiveChat
