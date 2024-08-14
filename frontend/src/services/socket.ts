import { io } from "socket.io-client"

const URL: string = import.meta.env.PROD ? "undefined" : "http://localhost:3000"

const socket = io(URL)

export default socket
