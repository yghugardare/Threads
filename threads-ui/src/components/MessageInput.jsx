/* eslint-disable react/prop-types */
import { Input, InputGroup, InputRightElement, Spinner } from "@chakra-ui/react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { conversationsAtom, selectedConversations } from "../atoms/messagesAtom";

function MessageInput({ setMessages }) {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const [isSending, setIsSending] = useState(false);
  const selectedConversation = useRecoilValue(selectedConversations);
  const setConversations = useSetRecoilState(conversationsAtom);
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;
    setIsSending(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
          // img: imgUrl,
        }),
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      // console.log(data);
      setMessages((messages) => [...messages, data]);
      setConversations((prevConvs) => {
				const updatedConversations = prevConvs.map((conversation) => {
					if (conversation._id === selectedConversation._id) {
						return {
							...conversation,
							lastMessage: {
								text: messageText,
								sender: data.sender,
							},
						};
					}
					return conversation;
				});
				return updatedConversations;
			});
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setMessageText("")
      setIsSending(false);
    }
  };
  return (
    <form onSubmit={handleSendMessage}>
      <InputGroup>
        <Input w={"full"} placeholder="Type a message.." 
        onChange={(e)=>setMessageText(e.target.value)
          
        }
        value={messageText}
        />
        <InputRightElement cursor={"pointer"} onClick={handleSendMessage} >
        {!isSending ? (
								<IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
							) : (
								<Spinner size={"md"} />
							)}
        </InputRightElement>
      </InputGroup>
    </form>
  );
}

export default MessageInput;
