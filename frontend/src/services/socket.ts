import { io } from "socket.io-client"

const URL: string = import.meta.env.VITE_SOCKET_URL
console.log(URL,"SOCKER URL")
const socket = io(URL,{autoConnect:false})

export default socket
