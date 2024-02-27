import { Box, Flex, Link, Text, VStack } from "@chakra-ui/react";
import useGetSuggestedUsers from "../../hooks/useGetSuggestedUsers";
import SuggestedHeader from "./SuggestedHeader";
import SuggestedUser from "./SuggestedUser";

const SuggestedUsers = () => {
  const { isLoading, suggestedUsers } = useGetSuggestedUsers();
  // optional: render loading skeleton
  if (isLoading) return null;

  return (
    <VStack py={8} px={6} gap={4}>
      <SuggestedHeader />

      {/* show the titles ONLY if suggested users exist */}
      {suggestedUsers.length !== 0 && (
        <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
          <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
            Suggested for you
          </Text>
          <Text fontSize={12} fontWeight={"bold"} color={"white"}>
            See All
          </Text>
        </Flex>
      )}

      {suggestedUsers.map((user) => (
        <SuggestedUser user={user} key={user.id} />
      ))}

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
