import {
  Avatar,
  Box,
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
import {  CgMoreO } from "react-icons/cg";
import { useToast } from '@chakra-ui/react'

function UserHeader() {
    const {colorMode} = useColorMode()
    const toast = useToast()
    function copyUrl(){
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(()=>{
            toast({
                title:"URL Copied",
                description: "Profile URL copied to clipboard",
                status:"success",
                duration :2000,
                isClosable:true
            })
        })
    }
  return (
    <VStack>
      {/* Part 1 */}
      <Flex justifyContent={"space-between"} width={"full"}>
        {/* Box 1 */}
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zuckerbarg</Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize="sm">markzurkerberg</Text>
            <Text fontSize={"xs"} bg={colorMode==="dark" ? "gray.dark" : "gray.300"} color={colorMode==="dark" ? "gray.light" : "gray.dark"} fontWeight={500} padding={1} borderRadius={"full"}>threads.net</Text>
          </Flex>
        </Box>
        {/* Box 2 */}
        <Box>
          <Avatar name="Mark Zuckerverge" src="/zuck-avatar.png" size={"xl"} />
        </Box>
      </Flex>
      {/* Part 2 */}
      <Text>Co Founder , Executive Chairman and CEO of Meta.</Text>
      {/* Part 3 */}
      <Flex w={"full"} justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>3.2k Followers</Text>
          <Box width={1} height={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="iconContainer">
            <BsInstagram size={24}/>
          </Box>
          <Box className="iconContainer">
            <Menu>
              <MenuButton>
                <CgMoreO size={24}/>
              </MenuButton>
              <Portal>
                <MenuList bg={colorMode==="dark"?"gray.dark":"gray.300"}>
                  <MenuItem bg={colorMode==="dark"?"gray.dark":"gray.300"} onClick={copyUrl}>Copy Link</MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      {/* Part 4 */}
      <Flex w={"full"}>
        <Flex borderBottom={colorMode==="dark"?"1.5px solid white":"1.65px solid black"} flex={1} justifyContent={"center"} pb={3} cursor={"pointer"}>
            <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
            <Text>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}

export default UserHeader;
