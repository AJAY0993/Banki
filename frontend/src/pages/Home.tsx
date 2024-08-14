import CreateRoom from "../features/room/CreateRoom"
import JoinRoom from "../features/room/JoinRoom"
import AppLayout from "../ui/AppLayout"

function Home() {
  return (
    <AppLayout>
      <div className="text-neutral-50 flex items-center justify-center gap-4 w-full h-screen">
        <JoinRoom></JoinRoom>
        <CreateRoom></CreateRoom>
      </div>
    </AppLayout>
  )
}

export default Home
