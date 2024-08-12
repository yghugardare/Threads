import { Flex, Image, useColorMode } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

import { BsFillChatQuoteFill } from "react-icons/bs";
import { MdOutlineSettings } from "react-icons/md";
import LogoutButton from "./LogoutButton";
import authScreenAtom from "../atoms/authAtom";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}
      {
        !user && (
          <Link 
          to={"/auth"}
          onClick={()=>setAuthScreen("login")}>Login</Link>
        )
      }
      <Image
        cursor={"pointer"}
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        w={6}
        onClick={toggleColorMode}
      />
      {user && (
        <Flex alignItems={"center"} gap={4}>
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
      {
        !user && (
          <Link onClick={()=>setAuthScreen("signup")} to={"/auth"}>Sign Up</Link>
        )
      }
    </Flex>
  );
}

export default Header;
