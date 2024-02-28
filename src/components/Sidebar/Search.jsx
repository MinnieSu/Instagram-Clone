import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from "../../hooks/useSearchUser";
import SuggestedUser from "../SuggestedUsers/SuggestedUser";

const Search = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser, isLoading, getUserProfile } = useSearchUser();
  const searchRef = useRef(null);
  const handleSearchUser = (e) => {
    // when clicking on "submit" button, prevent it from submitting a form
    e.preventDefault();
    getUserProfile(searchRef.current.value);
  };
  return (
    <>
      <Tooltip
        hasArrow
        label={"Search"}
        placement={"right"}
        ml={1}
        openDelay={500}
        display={{ base: "block", md: "none" }}
      >
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "whiteAlpha.400" }}
          borderRadius={6}
          p={2}
          w={{ base: 10, md: "full" }}
          justifyContent={{ base: "center", md: "flex-start" }}
          onClick={onOpen}
        >
          <SearchLogo />
          <Box display={{ base: "none", md: "block" }}>Search</Box>
        </Flex>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset={"slideInLeft"}>
        <ModalOverlay />
        <ModalContent bg={"black"} border={"solid 1px gray"} maxW={"400px"}>
          <ModalHeader>Search user</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSearchUser}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input placeholder="as a programmer" ref={searchRef} />
              </FormControl>

              <Flex w={"full"} jestifyContent={"flex-end"}>
                <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isLoading}>
                  Search
                </Button>
              </Flex>
            </form>
            {/* pass the setUser function to update the number of followers for the users appeared in search results */}
            {user && <SuggestedUser user={user} setUser={setUser} />}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
