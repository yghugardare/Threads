/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import { useState } from "react";

function UserPost({ likes, postTitle, postImg, replies }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/username/post/12"}>
      {/* whole container */}
      <Flex gap={3} py={5} mb={4}>
        {/* Part 1 */}
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar size={"md"} name="Mark Zuckerberg" src="/zuck-avatar.png" />
          <Box h={"full"} w="1px" bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="Yash"
              position={"absolute"}
              top={0}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Freesza"
              position={"absolute"}
              bottom={0}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="Vegeta"
              position={"absolute"}
              bottom={0}
              left={"5px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        {/* Part 2 */}
        <Flex flexDirection={"column"} gap={2}>
          {/* Box1 */}
          <Flex justifyContent={"space-between"} w={"full"}>
            {/* name and verification */}
            <Flex alignItems={"center"} w={"full"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                markzuckerberg
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            {/* timeago and options */}
            <Flex gap={4} alignItems={"cneter"}>
              <Text color={"gray.light"}>1d</Text>

              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                borderRadius={"full"}
                w={6}
                h={6}
                _hover={{
                  background: "gray.100",
                  color: "black",
                }}
              >
                <BsThreeDots />
              </Flex>
            </Flex>
          </Flex>
          {/* Box 2 */}
          <Text fontSize={"sm"}>{postTitle}</Text>
          {/* Box 3 */}
          {postImg && (
            <Box overflow={"hidden"} borderRadius={6}>
              <Image src={postImg} w={"full"}></Image>
            </Box>
          )}
          {/* Box 4 */}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>
          {/* Box 5 */}
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost;
