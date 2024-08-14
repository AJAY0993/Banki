import { io } from "socket.io-client"

const URL: string = import.meta.env.VITE_API_URL

const socket = io(URL)

export default socket
