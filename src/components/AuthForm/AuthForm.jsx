import { Box, Button, Flex, Image, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  // create useState to determine sign up or log in. displays additional inputs "confirm email" and sign up botton if signing up, display only email and password and login button if logging in
  const [isLogin, setIsLogin] = useState(true);
  //   create useState to copy the email and password. create an object inputs to store the data and pass it to setInputs.
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  //   useNavigate hook returns a function that lets you navigate programmatically
  const navigate = useNavigate();
  const handleAuth = () => {
    if (!inputs.email || !inputs.password) {
      alert("Please fill all the field!");
      return;
    }
    navigate("/");
  };
  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        {/* use vstack to stack the instgram logo, inputs for email and password vertically */}
        <VStack spacing={4}>
          <Image src="/logo.png" h={24} cursor={"pointer"} alt="Instagram" />
          <Input placeholder="Email" fontSize={14} type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
          <Input placeholder="Password" fontSize={14} type="password" value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          {isLogin ? null : <Input placeholder="Confirm Password" fontSize={14} type="password" value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />}

          <Button w={"full"} colorScheme="blue" size={"sm"} fontStyle={14} onClick={handleAuth}>
            {isLogin ? "Log in" : "Sign up"}
          </Button>

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

          <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"}>
            <Image src="/google.png" w={5} alt="google logo" />
            <Text mx={2} color={"blue.500"}>
              Log in with Google
            </Text>
          </Flex>
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
