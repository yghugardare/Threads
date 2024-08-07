import { Avatar, Box, Button, Divider, Flex, Image, Text, useColorMode } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import { useState } from "react";
import Comments from "../components/Comments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useGetUserProfile from "../hooks/useGetUserProfile";

function PostPage() {
  const[liked,setLiked]= useState(false)
  const {loading,user} = useGetUserProfile();
  const {colorMode} = useColorMode()
 
  return (
    <>
      {/* Part 1 */}
      <Flex w={"full"} alignItems={"center"} gap={3}>
        {/* image + username and verification tick */}
        <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
        {/* name and verification */}
        <Flex alignItems={"center"} w={"full"}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            markzuckerberg
          </Text>
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Flex>
        {/* 1day ago and three dot */}
        <Flex alignItems={"center"} gap={3}>
          <Text color={"gray.light"}>1d</Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      {/* Part 2 */}
      <Text my={3}>Let&apos;s talk about Threads</Text>
      {/* Part 3 */}
      <Box overflow={"hidden"} borderRadius={6} border={"1px solid"} borderColor={"gray.light"}>
        <Image src={"/post1.png"} w={"full"}></Image>
      </Box>
      {/* Part 4 */}
      <Flex gap={3} my={3} cursor={"pointer"}>
      <Actions liked={liked} setLiked={setLiked}/>
      </Flex>
      {/* Part 5 */}
      <Flex alignItems={"center"} gap={2}>
        <Text fontSize={"sm"} color={"gray.light"}>
          31 replies
        </Text>
        <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
        <Text fontSize={"sm"} color={"gray.light"}>
          {238 + (liked? 1 : 0)} likes
        </Text>
      </Flex>
      {/* Part 6 */}
      <Divider my={4} borderColor={colorMode==="dark" ? "gray.light":"gray.dark"}/>
      <Flex justifyContent={"space-between"} >
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like , reply and Post.</Text>
        </Flex>
        <Button bg={colorMode==="light"? "gray.300":"gray.light"}>Get</Button>
      </Flex>
      <Divider my={4} borderColor={colorMode==="dark" ? "gray.light":"gray.dark"}/>
      {/* Part 7 Comment  */}
      <Comments
      username={"Yash Ghugardare"}
      comment={"Hey! Any job openings at Meta ?"}
      likes={1000}
      createdAt={1}
      userAvatar={""}
      />
      <Comments
      username={"Bill Gates"}
      comment={"Hey! Mark what's going on Buddy?!"}
      likes={69}
      createdAt={3}
      userAvatar={""}
      />
      <Comments
      username={"Elon Musk"}
      comment={"You suck Mark! Btw Yash , we are interested in hiring you. Come to Tesla 😎"}
      likes={89}
      createdAt={1}
      userAvatar={""}
      />
    </>
  );
}

export default PostPage;
