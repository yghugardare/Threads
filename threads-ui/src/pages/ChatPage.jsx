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
import { useState } from "react";
import { GiConversation } from "react-icons/gi";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
const conversations = [
  {
    _id: 1,
    isOnline: true,
    selectedConversation: false,
    lastMessage: {
      sender: 68,
      seen: false,
      text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
    },
    participants: [
      { username: "john", _id: 10, profilePic: "https://bit.ly/sage-adebayo" },
    ],
  },
  {
    _id: 2,
    isOnline: false,
    selectedConversation: true,
    lastMessage: {
      sender: 69,
      seen: true,
      text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
    },
    participants: [{ username: "om", _id: 11, profilePic: "" }],
  },
  {
    _id: 3,
    isOnline: true,
    selectedConversation: true,
    lastMessage: {
      sender: 70,
      seen: false,
      text: "In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:In some products, you might need to show a badge on the right corner of the avatar. We call this a badge. Here's an example that shows if the user is online:",
    },
    participants: [
      { username: "ram", _id: 12, profilePic: "https://bit.ly/kent-c-dodds" },
    ],
  },
  {
    _id: 4,
    isOnline: false,
    selectedConversation: false,
    lastMessage: {
      sender: 71,
      seen: true,
      text: "Hi",
    },
    participants: [{ username: "sia", _id: 13, profilePic: "" }],
  },
];
function ChatPage() {
  // eslint-disable-next-line no-unused-vars
  const [loadingConversations, setLoadingConversations] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [selectedConversation, setSelectedConversation] = useState(false);
  return (
    <Box
      position={"absolute"}
      left={"50%"}
      w={{ base: "100%", md: "80%", lg: "750px" }}
      p={4}
      transform={"translateX(-50%)"}
      border={"1px solid red"}
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
                isOnline={conversation.isOnline}
                conversation={conversation}
              />
            ))}
        </Flex>
        {!selectedConversation && (
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
        {selectedConversation && <MessageContainer />}
      </Flex>
    </Box>
  );
}

export default ChatPage;
