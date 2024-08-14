import http from "node:http"
import { Server } from "socket.io"
import app from "../app"

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin:process.env.WHITELIST_ORIGIN
  }
})

export default server
