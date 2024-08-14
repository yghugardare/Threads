import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiConversation } from "react-icons/gi";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import { useRecoilState } from "recoil";
import { conversationsAtom, selectedConversations } from "../atoms/messagesAtom";
import useShowToast from "../hooks/useShowToast";

// const conversations1 = [
//   {
//     _id: 1,
//     isOnline: true,
//     selectedConversation: false,
//     lastMessage: {
//       sender: 68,
//       seen: false,
//       text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
//     },
//     participants: [
//       { username: "john", _id: 10, profilePic: "https://bit.ly/sage-adebayo" },
//     ],
//   },
//   {
//     _id: 2,
//     isOnline: false,
//     selectedConversation: true,
//     lastMessage: {
//       sender: 69,
//       seen: true,
//       text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
//     },
//     participants: [{ username: "om", _id: 11, profilePic: "" }],
//   },
//   {
//     _id: 3,
//     isOnline: true,
//     selectedConversation: true,
//     lastMessage: {
//       sender: 70,
//       seen: false,
//       text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
//     },
//     participants: [
//       { username: "ram", _id: 12, profilePic: "https://bit.ly/kent-c-dodds" },
//     ],
//   },
//   {
//     _id: 4,
//     isOnline: false,
//     selectedConversation: false,
//     lastMessage: {
//       sender: 71,
//       seen: true,
//       text: "Hi",
//     },
//     participants: [{ username: "sia", _id: 13, profilePic: "" }],
//   },
// ];
function ChatPage() {
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversations);
  const [conversations, setConversations] = useRecoilState(conversationsAtom);
  
  const showToast = useShowToast();
  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch("api/messages/conversations");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        // console.log(data)
        setConversations(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoadingConversations(false);
      }
    };
    getConversations();
  }, [showToast, setConversations]);

  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      p={4}
      transform={"translateX(-50%)"}
      // border={"1px solid red"}
    >
      <Flex
        gap={4}
        flexDirection={{ base: "column", md: "row" }}
        maxW={{ sm: "400px", md: "full" }}
        mx={"auto"}
      >
        <Flex
          flex={30}
          gap={2}
          flexDirection={"column"}
          maxW={{ sm: "250px", md: "full" }}
          mx={"auto"}
        >
          <Text
            fontWeight={700}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Your conversations
          </Text>
          <form>
            <Flex alignItems={"center"} gap={2}>
              <Input placeholder="Search for a user" />
              <Button size={"sm"}>
                <SearchIcon />
              </Button>
            </Flex>
          </form>
          {loadingConversations &&
            [0, 1, 2, 3, 4].map((el) => (
              <Flex
                key={el}
                gap={4}
                alignItems={"center"}
                p={1}
                borderRadius={"md"}
              >
                <Box>
                  <SkeletonCircle size={10} />
                </Box>
                <Flex w={"full"} flexDirection={"column"} gap={3}>
                  <Skeleton h={"10px"} w={"80px"} />
                  <Skeleton h={"8px"} w={"90%"} />
                </Flex>
              </Flex>
            ))}
          {!loadingConversations &&
            conversations.map((conversation) => (
              <Conversation
                key={conversation._id}
                isOnline={true}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation._id && (
          <Flex
            flex={70}
            // border={"1px solid blue"}
            borderRadius={"md"}
            p={2}
            flexDir={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            height={"400px"}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex>
        )}
        {selectedConversation._id && <MessageContainer />}
      </Flex>
    </Box>
  );
}

export default ChatPage;
