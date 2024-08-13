import {
  Avatar,
  Divider,
  Flex,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const selectedCoversation = {
  userProfilePic: "",
  username: "Yash",
};
const messages = [
  {
    _id:1,
    ownMessage : true,
    seen : true,
    text:"Hi! Yash How are you doing??",
    img : "/anne.jpg"

  },
  {
    _id:2,
    ownMessage : false,
    seen : true,
    text:"Hi! Bro How are you doing??",
    img : ""

  },
  {
    _id:3,
    ownMessage : true,
    seen : true,
    text:"hakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications",
    img : "/anne.jpg"

  },
  {
    _id:4,
    ownMessage : false,
    seen : true,
    text:"hakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications",
    img : ""
  },
  {
    _id:5,
    ownMessage : true,
    seen : false,
    text:"",
    img : "/post1.png"
  },
]
function MessageContainer() {
  // eslint-disable-next-line no-unused-vars
  const [loadingMessages, setLoadingMessages] = useState(false);
  return (
    <Flex
    flex={70}
    bg={useColorModeValue("gray.200","gray.dark")}
    borderRadius={"md"}
    p={2}
    flexDirection={"column"}

    >
      {/* message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedCoversation.userProfilePic} size={"sm"}/>
        <Text display={"flex"} alignItems={"center"}>
          {selectedCoversation.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider borderColor={useColorModeValue("black", "gray.400")} />
      <Flex flexDirection={"column"} overflowY={"auto"} gap={4} my={4} p={2} h={"400px"} >
        {loadingMessages &&
          [...Array(5)].map((el, i) => (
            <Flex 
            gap={2}
            alignItems={"center"}
            p={1}
            borderRadius={"md"}
            alignSelf={i%2===0 ? "flex-start" : "flex-end"}           
            key={el + i}>
              {i%2===0 && <SkeletonCircle size={7}/>}
            <Flex flexDir={"column"} gap={2}>
              <Skeleton h={"8px"} w={"250px"}/>
              <Skeleton h={"8px"} w={"250px"}/>
              <Skeleton h={"8px"} w={"250px"}/>
            </Flex>
            {i%2 !== 0 && <SkeletonCircle size={7}/>}
            </Flex>
          ))}
          {!loadingMessages && messages.map(message => (
            <Flex key={message._id} direction={"column"}>
              <Messages message={message} ownMessage={message.ownMessage}/>
            </Flex>
          ))}
      </Flex>
      <MessageInput/>
    </Flex>
  );
}

export default MessageContainer;
