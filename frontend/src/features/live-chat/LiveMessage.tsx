import { useAppSelector } from "../../redux/hooks"
import messageArrayElement from "../../types/message"
import { getSignedInUser } from "../auth/authSlice"

function LiveMessage({ message }: { message: messageArrayElement }) {
  const user = useAppSelector(getSignedInUser)
  const username =
    user?.id === message.userId || user?._id === message.userId
      ? "You"
      : message.username
  return (
    <div className="lg:p-4 border-b-2">
      <span className=" inline-block lg:mr-4 font-semibold capitalize">
        {username}
      </span>
      <p className="inline">{message.message}</p>
    </div>
  )
}

export default LiveMessage
