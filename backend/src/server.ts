import server from "./config/socket"
import connectToDb from "./config/db"
import "./services/socketService"
const PORT = process.env.PORT || 3000
connectToDb().then(() =>
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
)
