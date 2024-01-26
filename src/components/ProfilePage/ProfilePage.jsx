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

// Profile page logic:
// if there is a valid user profile, show the profile header; no valid user, show 'UserNotFound' component
// if the status is loading, we show the 'ProfileHeaderSkeleton' component for loading effect

// Inside 'ProfileHeader', we are fetching user information stored inside a glocal state 'userProfile'
// When clicking 'edit profile' button, we are opening the modal 'EditProfile', which calls the hook 'useEditProfile' that updating user profile in the background
// 'useEditProfile': takes the reference for storage and users info in firebase.
// it checks if user upload their profile pic, if yes upload it to the storage,
// it updates user info if there is any changes, set in the firestore DB and local storage, update user info in global states 'authUser' and 'userProfile', show a pop up saying sucessfully uploaded.
// then we use the {isUpdating, editProfile} in 'EditProfile' component
