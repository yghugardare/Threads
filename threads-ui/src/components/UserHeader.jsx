/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useToast } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

function UserHeader({ user }) {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const { colorMode } = useColorMode();
  const toast = useToast();
  const showToast = useShowToast();
  const [updating, setUpdating] = useState(false);
  function copyUrl() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({
        title: "URL Copied",
        description: "Profile URL copied to clipboard",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    });
  }
  async function handleFollowUnfollow() {
    try {
      if (!currentUser) {
        showToast(
          "Error",
          "Please Login/Sign Up to Follow or Unfollow",
          "error"
        );
        return;
      }
      if (updating) return;
      setUpdating(true);
      const res = await fetch(`api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollowed ${user.name}!`, "success");
        user.followers.pop();
      } else {
        showToast("Success", `Followed ${user.name}!`, "success");
        // just to show the immedite effect
        user.followers.push(currentUser?._id);
      }
      setFollowing((following) => !following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  }
  return (
    <VStack>
      {/* Part 1 */}
      <Flex justifyContent={"space-between"} width={"full"}>
        {/* Box 1 */}
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize="sm">{user.username}</Text>
            <Text
              fontSize={"xs"}
              bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
              color={colorMode === "dark" ? "gray.light" : "gray.dark"}
              fontWeight={500}
              padding={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        {/* Box 2 */}
        <Box>
          {user.profilePic ? (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          ) : (
            <Avatar
              name={user.name}
              // src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      {/* Part 2 */}
      <Text alignSelf={"self-start"}>
        {user.bio || "Hi, I am using Threads!"}
      </Text>
      {currentUser?._id === user._id ? (
        <NavLink to="/update">
          <Button
            bg={colorMode === "light" ? "gray.300" : "gray.700"}
            size={"sm"}
          >
            Update Profile
          </Button>
        </NavLink>
      ) : (
        <Button
          isLoading={updating}
          onClick={handleFollowUnfollow}
          bg={colorMode === "dark" ? "blue.600" : "skyblue"}
          _hover={{
            bg: "blue.400",
          }}
          size={"sm"}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      {/* Part 3 */}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box
            width={1}
            height={1}
            bg={"gray.light"}
            borderRadius={"full"}
          ></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="iconContainer">
            <BsInstagram size={24} />
          </Box>
          <Box className="iconContainer">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} />
              </MenuButton>
              <Portal>
                <MenuList bg={colorMode === "dark" ? "gray.dark" : "gray.300"}>
                  <MenuItem
                    bg={colorMode === "dark" ? "gray.dark" : "gray.300"}
                    onClick={copyUrl}
                  >
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      {/* Part 4 */}
      <Flex w={"full"}>
        <Flex
          borderBottom={
            colorMode === "dark" ? "1.5px solid white" : "1.65px solid black"
          }
          flex={1}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
