import { useToast } from "@chakra-ui/react";

// use Toast component from chakra to display the error message as a pop up

const useShowToast = () => {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToast;
