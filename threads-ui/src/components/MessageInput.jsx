import { Input, InputGroup, InputRightElement } from "@chakra-ui/react"
import {IoSendSharp} from "react-icons/io5"

function MessageInput() {
  return (
   <form action="">
    <InputGroup>
    <Input w={"full"} placeholder="Type a message.."/>
    <InputRightElement cursor={"pointer"}>
    <IoSendSharp/>
    </InputRightElement>
    </InputGroup>
   </form>
  )
}

export default MessageInput