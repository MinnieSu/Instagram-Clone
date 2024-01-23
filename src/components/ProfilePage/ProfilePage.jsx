import { chakra, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import useGetUserProfileByUsername from "../../hooks/useGetUserProfileByUsername";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfilePosts from "../Profile/ProfilePosts";
import ProfileTabs from "../Profile/ProfileTabs";

const ProfilePage = () => {
  // useParams hook with username because we use dynamic path as "/:username" in App.jsx
  const { username } = useParams();
  const { isLoading, userProfile } = useGetUserProfileByUsername(username);

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;

  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} my={"auto"} flexDirection={"column"}>
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex
        px={{ base: 2, md: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};

export default ProfilePage;

const UserNotFound = () => {
  const ChakraLink = chakra(RouterLink);

  return (
    <Flex flexDirection={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}> User Not Found</Text>
      <ChakraLink to={"/"} as={RouterLink} color={"blue.500"} w={"max-content"} mx={"auto"}>
        Go Home
      </ChakraLink>
    </Flex>
  );
};

const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size={24} />
      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
        <Skeleton height={"12px"} w={"150px"} />
        <Skeleton height={"12px"} w={"100px"} />
      </VStack>
    </Flex>
  );
};
