import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  useColorMode,
} from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import LogoutButton from "./LogoutButton";
import authScreenAtom from "../atoms/authAtom";
import { Search2Icon, SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

function Header() {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const showToast = useShowToast();
  const navigate = useNavigate();
  async function handleSearch() {
    try {
      const username = searchText.toLowerCase().split(" ")[0];
      if (!username) {
        return;
      }
      const res = await fetch(`/api/users/profile/${username}`);
      const searchedUser = await res.json();
      if (searchedUser.error) {
        showToast("Error", searchedUser.error, "error");
        return;
      }
      if(searchedUser.isFrozen){
        showToast("Error", "User has frozen his account!", "error");
        return;
      }
      navigate(`/${searchedUser.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    } finally {
      setSearch(false);
    }
  }
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {!user && (
        <Link to={"/auth"} onClick={() => setAuthScreen("login")}>
          Login
        </Link>
      )}
      {!search && (
        <Image
          cursor={"pointer"}
          src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
          w={6}
          onClick={toggleColorMode}
        />
      )}
      {search && (
        <Flex alignItems={"center"}>
          <Input
            placeholder="Type in the user's name.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={handleSearch}>
            <SearchIcon />
          </Button>
        </Flex>
      )}
      {user && (
        <Flex alignItems={"center"} gap={4}>
          {!search && (
            <Box cursor={"pointer"} onClick={() => setSearch(true)}>
              <Search2Icon />
            </Box>
          )}
          <Link to={`/${user.username}`}>
            <RxAvatar size={24} />
          </Link>
          <Link to={`/chat`}>
            <BsFillChatQuoteFill size={20} />
          </Link>
          <Link to={`/settings`}>
            <MdOutlineSettings size={20} />
          </Link>
          <LogoutButton />
        </Flex>
      )}
      {!user && (
        <Link onClick={() => setAuthScreen("signup")} to={"/auth"}>
          Sign Up
        </Link>
      )}
    </Flex>
  );
}

export default Header;
