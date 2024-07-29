import { useRef, useState } from "react";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import useShowToast from "../hooks/useShowToast";
import {
  Avatar,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";

function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: "",
    bio: user.bio,
  });
  const fileRef = useRef();
  const showToast = useShowToast();
  const {handleImageChange,imgUrl}  = usePreviewImg();

  return (
    <div>
      <Flex align={"center"} justify={"center"}>
        <Stack
          bg={useColorModeValue("white", "gray.dark")}
          p={6}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          spacing={4}
          boxShadow={"lg"}
        >
          <Heading fontSize={{ base: "2xl", sm: "3xl" }} lineHeight={1.1}>
            User Profile Edit
          </Heading>
          <FormControl>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  src={imgUrl || user.profilePic}
                  // name={user.username}
                  size={"xl"}
                  boxShadow={"lg"}
                ></Avatar>
              </Center>
              <Center w={"full"}>
                <Button w={"full"} onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={(e) => handleImageChange(e)}
                ></Input>
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Bruce Wayne"
              type="text"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder="Batman"
              // _placeholder={{color : "red.500"}}
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="batman@gmail.com"
              // _placeholder={{color : "red.500"}}
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="I am vengeance! I am the night! I am BATMAN!"
              // _placeholder={{color : "red.500"}}
              type="text"
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            ></Input>
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              // _placeholder={{color : "red.500"}}
              type="password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            ></Input>
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              w="full"
              bg={"red.400"}
              color="white"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              w="full"
              bg={"green.400"}
              color="white"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </div>
  );
}

export default UpdateProfilePage;
