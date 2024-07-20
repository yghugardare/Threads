/* eslint-disable react/prop-types */
import { Avatar, Divider, Flex, Text, useColorMode } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useState } from "react";

function Comments({ username, userAvatar, createdAt, comment, likes }) {
  const [liked, setLiked] = useState(false);
  const {colorMode} = useColorMode()
  return (
    <Flex gap={4} py={1} my={2}>
      {/* Part 1 */}
      <Avatar name={username} src={userAvatar} size={"sm"} />
      <Flex flexDirection={"column"} gap={1} w={"full"}>
        {/* username and createdAt with dots */}
        <Flex justifyContent={"space-between"} w={"full"} alignItems={"center"}>
          <Text>{username}</Text>
          <Flex alignItems={"center"} gap={2}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {createdAt}day
            </Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        {/* comment */}
        <Text>{comment}</Text>
        {/* Actions */}
        <Actions liked={liked} setLiked={setLiked} />
        {/* Likes */}
        <Text fontSize={"sm"} color={"gray.light"}>
          {likes + (liked ? 1 : 0)} likes
        </Text>
        {/* Divider */}
        <Divider my={1} borderColor={colorMode==="dark" ? "gray.light":"gray.dark"}/>
      </Flex>
    </Flex>
  );
}

export default Comments;
