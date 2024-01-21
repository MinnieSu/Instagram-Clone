import { Button, Container, Input } from "@chakra-ui/react";
import { useState } from "react";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const TestPage = () => {
  const [inputs, SetInputs] = useState({
    month: "",
  });
  const saveInputs = async (inputs) => {
    console.log("b4 read");
    const citiesCol = collection(firestore, "cities");
    const citySnapshot = await getDocs(citiesCol);
    console.log(citySnapshot);
    console.log("bafter read");

    console.log(inputs);
    const docReference = doc(firestore, "data", "one");
    const writePromise = setDoc(docReference, inputs);

    console.log("Promise status/state:", writePromise);

    await writePromise
      .then(() => {
        console.log("Data successfully written to Firestore");
      })
      .catch((error) => {
        console.error("Error writing data to Firestore:", error);
      });
    console.log("ffooooo");
  };
  return (
    <Container maxW={"container.lg"} py={5}>
      <Input
        color={"red"}
        placeholder="Enter Month"
        value={inputs.month}
        onChange={(e) => SetInputs({ month: e.target.value })}
      />
      <Button
        onClick={() => {
          console.log("Button clicked");
          saveInputs(inputs);
        }}
      >
        Save
      </Button>
    </Container>
  );
};

export default TestPage;
