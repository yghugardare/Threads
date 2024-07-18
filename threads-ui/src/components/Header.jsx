import { Flex, Image, useColorMode } from "@chakra-ui/react"


function Header() {
    const {colorMode,toggleColorMode} = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={6} mb={12}>
        <Image
            cursor={"pointer"}
            src={colorMode==="dark" ? "/light-logo.svg": "/dark-logo.svg"}
            w={6}
            onClick={toggleColorMode}
        />
    </Flex>
  )
}

export default Header