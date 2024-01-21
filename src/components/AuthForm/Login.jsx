import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";

const Login = () => {
  //   create useState to copy the email and password. create an object inputs to store the data and pass it to setInputs.
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  return (
    <>
      <Input
        placeholder="Email"
        fontSize={14}
        size={"sm"}
        type="email"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
      />
      <Input
        placeholder="Password"
        fontSize={14}
         size={"sm"}
        type="password"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
      />
      <Button w={"full"} colorScheme="blue" size={"sm"} fontStyle={14}>
        Log in
      </Button>
    </>
  );
};

export default Login;
