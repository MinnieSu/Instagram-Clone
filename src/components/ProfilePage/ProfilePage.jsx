import { Container, Flex } from "@chakra-ui/react";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfilePosts from "../Profile/ProfilePosts";
import ProfileTabs from "../Profile/ProfileTabs";

const ProfilePage = () => {
  return (
    <Container maxW={"container.lg"} py={5}>
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} my={"auto"} flexDirection={"column"}>
        <ProfileHeader />
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
