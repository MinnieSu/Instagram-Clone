import { Avatar, AvatarGroup, Button, Flex, Text, VStack } from "@chakra-ui/react";

const ProfileHeader = () => {
  return (
    <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
      {/* Profile photo */}
      <AvatarGroup
        size={{ base: "xl", md: "2xl" }}
        justifySelf={"center"}
        alignSelf={"center"}
        mx={"auto"}
      >
        <Avatar name="As a Programmer" src="/profilepic.png" alt="As a programmer logo" />
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
          <Text fontSize={{ base: "sm", md: "lg" }}>asaprogrammer_</Text>
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
        </Flex>
        <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              132
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              2013
            </Text>
            followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as={"span"} fontWeight={"bold"} mr={1}>
              392
            </Text>
            following
          </Text>
        </Flex>
        {/* Profile biography */}
        <Flex alignItems={"ceter"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            As a Programmer
          </Text>
        </Flex>
        <Text fontSize={"sm"}> Learning to level up my skills as a programmer.</Text>
      </VStack>
    </Flex>
  );
};

export default ProfileHeader;
