import http from "node:http"
import { Server } from "socket.io"
import app from "../app"

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

export default server
