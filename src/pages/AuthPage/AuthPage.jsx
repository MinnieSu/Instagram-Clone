import { Flex, Container, Box, Image, VStack } from "@chakra-ui/react";
import AuthForm from "../../components/AuthForm/AuthForm";

const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* Left-hand side: image */}
          <Box display={{ base: "none", md: "block" }}>
            <Image src="/auth.png" h={650} alt="Phone image" />
          </Box>
          {/* Right-hand side: authentication form */}
          <VStack spacing={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"ceter"}>Get the app.</Box>
            <Flex gap={5} justifyContent={"center"}>
              <Image src="/playstore.png" h={"10"} alt="Playstore logo" />
              <Image src="/microsoft.png" h={"10"} alt="Microsoft logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};

export default AuthPage;

// container: takes everything in the center of the container component
// vstack: put elements on top of each other, unlike flex.
