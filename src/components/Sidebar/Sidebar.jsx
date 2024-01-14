import { Avatar, Box, Flex, Tooltip, chakra } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
// sidebar has one flex holding the icons and one flex holding the texts.

// using Chakra UI's chakra utility function. This allows you to apply Chakra UI styling props to the RouterLink
const ChakraLink = chakra(RouterLink);

const Sidebar = () => {
  const sideBarItems = [
    { icon: <AiFillHome size={25} />, text: "Home", link: "/" },
    { icon: <SearchLogo />, text: "Search" },
    { icon: <NotificationsLogo />, text: "Notification" },
    { icon: <CreatePostLogo />, text: "Create" },
    { icon: <Avatar size={"sm"} name="Myra Sun" src="profilepic.png" />, text: "Profile", link: "/asaprogrammer" },
  ];
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
            {sideBarItems.map((item, index) => {
              return (
                <Tooltip key={index} hasArrow label={item.text} placement={"right"} ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
                  <ChakraLink
                    display={"flex"}
                    to={item.link || null}
                    as={RouterLink}
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                    justifyContent={{ base: "center", md: "flex-start" }}
                  >
                    {item.icon}

                    <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                  </ChakraLink>
                </Tooltip>
              );
            })}
          </Flex>
        </Box>
        <Tooltip hasArrow label={"Logout"} placement={"right"} ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
          <ChakraLink
            display={"flex"}
            to={"/auth"}
            as={RouterLink}
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

            <Box display={{ base: "none", md: "block" }}>Logout</Box>
          </ChakraLink>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default Sidebar;
