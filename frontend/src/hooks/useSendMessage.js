import { useState } from "react"
import toast from "react-hot-toast"
import useConversation from "../zustand/useConversation"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message }),
      })
      const data = await res.json();
      if (data.code) {
        throw new Error(data.message)
      }
      setMessages([...messages, data.data])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
export default useSendMessage