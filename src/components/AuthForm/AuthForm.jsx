import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import GoogleAuth from "./GoogleAuth";
import Login from "./Login";
import Signup from "./Signup";

const AuthForm = () => {
  // create useState to determine sign up or log in. displays additional inputs "confirm email" and sign up botton if signing up, display only email and password and login button if logging in
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        {/* use vstack to stack the instgram logo, inputs for email and password vertically */}
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram" />
          {isLogin ? <Login /> : <Signup />}

          {/* ----------------OR---------------- */}
          {/* alignItems attribute helps to align index with the text, setting margin y, gap and width  */}
          <Flex alignItems={"center"} justifyContent={"center"} my={4} gap={1} w={"full"}>
            {/* use box to create index on both side of "or" text */}
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"white"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>
          <GoogleAuth prefix={isLogin ? "Log in" : "Sign up"} />
        </VStack>
      </Box>

      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex alignItems={"center"} justifyContent={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box onClick={() => setIsLogin(!isLogin)} color={"blue.500"} cursor={"pointer"}>
            {isLogin ? "Sign Up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default AuthForm;

// we want to render login form first so we initially set "isLogin" to true.
// login form includes: (email+ password inputs, button for login, box with text "don't have an account? Sign up")
// when user clicks the boxes with text "sign up", the "isLogin" will be set to false and we render the signup form.
// signup form includes: additional conform password input, button for sign up, box with text "already have an account? login"
