import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from "@chakra-ui/react";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/useUserProfileStore";

const ProfileHeader = () => {
  const { userProfile } = useUserProfileStore();
  const authUser = useAuthStore((state) => state.user);
  // if user is authenticated and viewing own profile, show edit profile button
  const viewingOwnProfileAndAuth = authUser && authUser.username === userProfile.username;
  // if user is authenticated and viewing another user's profile, show edit profile button
  const viewingAnotherUserProfileAndAuth = authUser && authUser.username !== userProfile.username;
  // // if user is not authenticated, both edit profile and follow button won't show up

  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
      {/* Profile photo */}
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"center"}
        mx={"auto"}
      >
        <Avatar src={userProfile.profilePicURL} alt="As a programmer logo" />
      </AvatarGroup>
      <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
        <Flex
          alignItems={"center"}
          justifyContent={{ base: "center", sm: "flex-start" }}
          direction={{ base: "column", sm: "row" }}
          gap={4}
          w={"full"}
        >
          {/* Username */}
          <Text fontSize={{ base: "sm", md: "lg" }}>{userProfile.username}</Text>

          {viewingOwnProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"white"}
                color={"black"}
                _hover={"whiteAlpha.800"}
                size={{ base: "xs", md: "sm" }}
              >
                Edit Profile
              </Button>
            </Flex>
          )}
          {viewingAnotherUserProfileAndAuth && (
            <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
              <Button
                bg={"blue.500"}
                color={"white"}
                _hover={"blue.600"}
                size={{ base: "xs", md: "sm" }}
              >
                Follow
              </Button>
            </Flex>
          )}
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.posts.length}
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.followers.length}
            </Text>
            followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              {userProfile.following.length}
            </Text>
            following
          </Text>
        </Flex>
        {/* Profile biography */}
        <Flex alignItems={"ceter"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            {userProfile.fullName}
          </Text>
        </Flex>
        <Text fontSize={"sm"}> {userProfile.bio}</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
