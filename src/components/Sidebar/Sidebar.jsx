import { Avatar, Box, Flex, Tooltip } from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { CreatePostLogo, InstagramLogo, InstagramMobileLogo, NotificationsLogo, SearchLogo } from "../../assets/constants";
import { AiFillHome } from "react-icons/ai";
// sidebar has one flex holding the icons and one flex holding the texts.
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
        <Box display={{ base: "none", md: "block" }} pb={10}>
          <Link to={"/"} as={RouterLink} pl={2} cursor={"pointer"}>
            <InstagramLogo />
          </Link>
        </Box>
        <Box display={{ base: "block", md: "none" }}>
          <Link to={"/"} as={RouterLink} pl={2} borderRadius={6} _hover={{ bg: "whiteAlpha.200" }} w={10} cursor={"pointer"}>
            <InstagramMobileLogo />
          </Link>

          <Flex direction={"column"} gap={5} cursor={"pointer"}>
            {sideBarItems.map((item, index) => {
              return (
                <Tooltip key={index} hasArrow label={item.text} placement={"right"} ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
                  <Link
                    display={"flex"}
                    to={item.link || null}
                    as={RouterLink}
                    alignItems={"center"}
                    gap={4}
                    _hover={{ bg: "whiteAlpha.400" }}
                    borderRadius={6}
                    p={2}
                    w={{ base: 10, md: "full" }}
                  >
                    {item.icon}

                    <Box display={{ base: "none", md: "block" }}>{item.text}</Box>
                  </Link>
                </Tooltip>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Sidebar;
