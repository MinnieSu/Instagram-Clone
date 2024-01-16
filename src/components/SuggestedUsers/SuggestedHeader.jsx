import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { chakra } from "@chakra-ui/react";

const ChakraLink = chakra(RouterLink);

const SuggestedHeader = () => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src="/profilepic.png" name="As a Programmer" size={"lg"} />
        <Text fontSize={12} fontWeight={"bold"}>
          As a Programmer
        </Text>
      </Flex>
      <ChakraLink as={RouterLink} to={"/auth"} fontSize={14} fontWeight={"medium"} color={"blue.400"} cursor={"pointer"} justifyContent={"end"}>
        Log out
      </ChakraLink>
    </Flex>
  );
};

export default SuggestedHeader;
