import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react";
import useGetUserPosts from "../../hooks/useGetUserPosts";
import ProfilePost from "./ProfilePost";
const ProfilePosts = () => {
  const { isLoading, posts } = useGetUserPosts();
  const noPostsFound = !isLoading && posts.length === 0;
  if (noPostsFound) return <NoPostsFound />;
  return (
    // create loading effects using skeleton compoenent from ChaKra
    <Grid templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }} gap={1} columnGap={1}>
      {isLoading &&
        [0, 1, 2].map((item, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          {posts.map((post) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;

const NoPostsFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"} mt={10}>
      <Text fontSize={"2xl"}>No Posts Found 🤨 </Text>
    </Flex>
  );
};
