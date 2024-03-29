import { Box, Flex, Tooltip, chakra, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout";
import SidebarItems from "./SidebarItems";
// sidebar has one flex holding the icons and one flex holding the texts.

// using Chakra UI's chakra utility function. This allows you to apply Chakra UI styling props to the RouterLink
const ChakraLink = chakra(RouterLink);

const Sidebar = () => {
  // call useLogout hook which returns 3 things:
  const { handleLogout, isLoggingOut } = useLogout();
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        {/* we can add both a style to this link as a normal chakra component && a functionality to it from react-router-dom */}
        <Box display={{ base: "none", md: "block" }}>
          <ChakraLink to={"/"} as={RouterLink} pl={2} cursor={"pointer"}>
            <InstagramLogo />
          </ChakraLink>
        </Box>
        <Box pt={5}>
          <ChakraLink
            to={"/"}
            as={RouterLink}
            borderRadius={6}
            _hover={{ bg: "whiteAlpha.200" }}
            w={10}
            cursor={"pointer"}
            display={{ base: "block", md: "none" }}
            p={2}
            mb={50}
          >
            <InstagramMobileLogo />
          </ChakraLink>

          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            <SidebarItems />
          </Flex>
        </Box>
        <Tooltip
          hasArrow
          label={"Logout"}
          placement={"right"}
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          {/* use state to take us to the authentication instead of using <Link> */}
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{ bg: "whiteAlpha.400" }}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            mt={"auto"}
          >
            <BiLogOut size={25}></BiLogOut>

            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
