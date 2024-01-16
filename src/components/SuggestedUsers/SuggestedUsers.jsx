import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />
      <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggested for you
        </Text>
        <Text fontSize={12} fontWeight={"bold"} color={"white"}>
          See All
        </Text>
      </Flex>
      <SuggestedUser name="Dan Abramov" followers={1392} avatar="/avatar1.png" />
      <SuggestedUser name="Ryan Florence" followers={567} avatar="/avatar2.png" />
      <SuggestedUser name="Christian Nwamba" followers={759} avatar="/avatar3.png" />

      <Box fontSize={12} color={"gray.500"} alignSelf={"start"} mt={5}>
        © 2024 Built by{" "}
        <Link href="https://github.com/MinnieSu" target={"_blank"} color={"blue.500"} fontSize={14}>
          Minnie Su
        </Link>
      </Box>
    </VStack>
  );
};

export default SuggestedUsers;
