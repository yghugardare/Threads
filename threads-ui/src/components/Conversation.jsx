/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { BsCheck2All, BsFillImageFill } from "react-icons/bs";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { selectedConversations } from "../atoms/messagesAtom";

function Conversation({ conversation, isOnline }) {
  const user = conversation?.participants[0];
  const lastMessage = conversation.lastMessage;
  const currentUser = useRecoilValue(userAtom);
  const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversations);
  const {colorMode} = useColorMode()
  // console.log()
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={1}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.500", "gray.dark"),
        color: "white",
      }}
      borderRadius={"md"}
      bg={
				selectedConversation?._id === conversation._id && (colorMode === "light" ? "gray.300" : "gray.dark") 
			}
      onClick={()=>{
        setSelectedConversation({
          _id : conversation._id,
          userId : user._id,
          userProfilePic : user.profilePic,
          username : user.username,
          mock : conversation.mock
        })
      }}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic}
          name={user.username}
        >
          {isOnline && <AvatarBadge boxSize={"1em"} bg={"green.400"} />}
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight={700} display={"flex"} alignItems={"center"}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        {/* we had a text here, but due to validateDomError p cannot have div or p as descendant */}
        <Box fontSize={"xs"} display={"flex"} alignItems={"ceter"} gap={1}>
          {currentUser._id === lastMessage.sender && (
            <Box color={lastMessage.seen && "blue.400"}>
              <BsCheck2All size={16} />
            </Box>
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text || <BsFillImageFill size={16} />}
        </Box>
      </Stack>
    </Flex>
  );
}

export default Conversation;
