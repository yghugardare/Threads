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
import { useEffect, useState } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { selectedConversations } from "../atoms/messagesAtom";
import { useRecoilState,useRecoilValue } from "recoil";
import useShowToast from "../hooks/useShowToast";
import userAtom from "../atoms/userAtom";

// const selectedCoversation = {
//   userProfilePic: "",
//   username: "Yash",
// };
// const messages = [
//   {
//     _id: 1,
//     ownMessage: true,
//     seen: true,
//     text: "Hi! Yash How are you doing??",
//     img: "/anne.jpg",
//   },
//   {
//     _id: 2,
//     ownMessage: false,
//     seen: true,
//     text: "Hi! Bro How are you doing??",
//     img: "",
//   },
//   {
//     _id: 3,
//     ownMessage: true,
//     seen: true,
//     text: "hakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications",
//     img: "/anne.jpg",
//   },
//   {
//     _id: 4,
//     ownMessage: false,
//     seen: true,
//     text: "hakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applicationshakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications",
//     img: "",
//   },
//   {
//     _id: 5,
//     ownMessage: true,
//     seen: false,
//     text: "",
//     img: "/post1.png",
//   },
// ];
function MessageContainer() {
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversations
  );
  const currentUser = useRecoilValue(userAtom)
  const showToast = useShowToast();
  useEffect(() => {
    const getMessages = async () => {
      try {
        // in case of new user
        if(selectedConversation.mock) return;
        // other user id is userid of the selected conversation
        const res = await fetch(`/api/messages/${selectedConversation.userId}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data)
        setMessages(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingMessages(false);
      }
    };
    getMessages();
  }, [showToast,selectedConversation.userId]);
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.200", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      {/* message header */}
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          {selectedConversation.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>
      <Divider borderColor={useColorModeValue("black", "gray.400")} />
      <Flex
        flexDirection={"column"}
        overflowY={"auto"}
        gap={4}
        my={4}
        p={2}
        h={"400px"}
      >
        {loadingMessages &&
          [...Array(5)].map((el, i) => (
            <Flex
            key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
              
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
                <Skeleton h={"8px"} w={"250px"} />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}
        {!loadingMessages &&
          messages.map((message) => (
            <Flex key={message._id} direction={"column"}>
              <Messages message={message} ownMessage={currentUser._id === message.sender} />
            </Flex>
          ))}
      </Flex>
      <MessageInput setMessages={setMessages}/>
    </Flex>
  );
}

export default MessageContainer;
