import { io } from "socket.io-client"

const URL: string = import.meta.env.SOCKET_URL

const socket = io(URL)

export default socket
