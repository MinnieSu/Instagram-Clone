import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const PostHeader = ({ username, avatar }) => {
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={avatar} alt={username} size={"sm"}></Avatar>
      </Flex>
      <Flex fontSize={12} fontWeight={"bold"} pl={2} mr={"auto"} alignItems={"center"}>
        {username}
        <Box color={"gray.500"} pl={2}>
          • 1w
        </Box>
      </Flex>
      <Box cursor={"pointer"}>
        <Text fontSize={12} fontWeight={"bold"} color={"blue.500"} _hover={{ color: "white" }} transition={"0.2s ease-in-out"}>
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
};

export default PostHeader;