import { v4 } from "uuid"
import { io } from "../config/socket"
import Room from "./roomService"
import getRandomNumber from "../utils/getRandomNumber"
import cards from "../utils/data"

io.on("connection", (socket) => {
  socket.on("event:createRoom", () => {
    const newRoom = Room.createRoom(v4())
    socket.emit("event:roomCreated", newRoom.roomId)
  })

  socket.on("event:joinRoom", (roomId: string) => {
    // join room with the socketId
    // catch the error
    try {
      Room.getRoom(roomId)?.joinRoom(socket.id)
      socket.join(roomId)
      socket.emit("event:roomJoined", roomId)
      io.in(roomId).emit("event:userJoined")
    } catch (error) {
      socket.emit("event:error", error)
    }
  })

  socket.on("event:checkRoom", (roomId: string) => {
    // check if room is available
    // catch the error

    try {
      const t = Room.isRoomAvailable(String(roomId))
      if (t) {
        socket.emit("event:roomChecked", { available: true })
        socket.join(roomId)
      } else if (!t) {
        socket.emit("event:roomChecked", { avaiable: false })
      }
      io.in(roomId).emit("event:userJoined")
    } catch (error) {
      socket.emit("event:error", error)
    }
  })

  socket.on("event:exitRoom", (roomId: string) => {
    // join room with the socketId
    // catch the error
    console.log("exit")
    try {
      Room.getRoom(roomId)?.exitRoom(socket.id)
      socket.leave(roomId)
      socket.emit("event:roomExited", roomId)
      io.in(roomId).emit("event:userExited")
    } catch (error) {
      socket.emit("event:", error)
    }
  })
  socket.on("event:deleteRoom", async (roomId: string) => {
    try {
      console.log("delete")
      Room.deleteRoom(roomId)
      const sockets = await io.in(roomId).fetchSockets()
      sockets.forEach((s) => {
        s.emit("event:roomDeleted", roomId)
        s.leave(roomId)
      })
      socket.emit("event:roomDeleted", roomId)
    } catch (error) {
      socket.emit("event:error", error)
    }
  })

  socket.on("event:next", async (roomId) => {
    // generate a romdom index
    const i = getRandomNumber(0, cards.length - 1)
    io.in(roomId).emit("event:next", i)
  })

  socket.on("event:message", handleLiveChat)
})

const handleLiveChat = ({
  roomId,
  message,
  userId,
  username
}: {
  roomId: string
  message: string
  userId: string
  username: string
}) => {
  io.in(roomId).emit("event:message", { message, userId, username })
}
