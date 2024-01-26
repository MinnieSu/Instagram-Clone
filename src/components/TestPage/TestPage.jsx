import { Button, Container, Input } from "@chakra-ui/react";
import { useState } from "react";
import { doc, setDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { ref, uploadString } from "firebase/storage";

const TestPage = () => {
  const [inputs, SetInputs] = useState({
    city: "",
    province: "",
  });
  const saveInputs = async (inputs) => {
    console.log("b4 read");
    const citiesCol = collection(firestore, "cities");
    const citySnapshot = await getDocs(citiesCol);
    console.log(citySnapshot);
    console.log("bafter read");

    console.log(inputs);
    const docReference = doc(firestore, "cities", "trt");
    await updateDoc(docReference, {
      city: "ottawa",
    });
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

  const uploadImage = () => {
    const storageRef = ref(storage, "Pictures/picture1");
    const picture1 = "";
    uploadString(storageRef, picture1, "data_url")
      .then(() => {
        console.log("Uploaded a data_url string!");
      })
      .catch((error) => {
        console.error("error uploading image: ", error);
      });
  };
  return (
    <Container maxW={"container.lg"} py={5}>
      <Input
        color={"white"}
        placeholder="Enter City"
        value={inputs.city}
        onChange={(e) => SetInputs({ ...inputs, city: e.target.value })}
      />
      <Input
        color={"gray"}
        placeholder="Enter Province"
        value={inputs.province}
        onChange={(e) => SetInputs({ ...inputs, province: e.target.value })}
      />
      <Button
        onClick={() => {
          console.log("Button clicked");
          saveInputs(inputs);
        }}
      >
        Save
      </Button>
      <Button
        onClick={() => {
          uploadImage();
        }}
      >
        Upload Image
      </Button>
    </Container>
  );
};

export default TestPage;
