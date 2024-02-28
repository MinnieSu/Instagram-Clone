import {
  Avatar,
  Button,
  Divider,
  Flex,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import useAuthStore from "../../store/authStore";
import useUserProfileStore from "../../store/userProfileStore";
import Comment from "../Comment/Comment";
import PostFooter from "../FeedPosts/PostFooter";

const ProfilePost = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userProfile = useUserProfileStore((state) => state.userProfile);
  const authUser = useAuthStore((state) => state.user);
  return (
    <>
      <GridItem
        cursor={"pointer"}
        borderRadius={4}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"whiteAlpha.300"}
        position={"relative"}
        aspectRatio={1 / 1}
        onClick={onOpen}
      >
        {/* Hovering effect showing counts of likes and comments*/}
        <Flex
          opacity={0}
          _hover={{ opacity: 1 }}
          bg={"blackAlpha.700"}
          position={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          transition={"all 0.3s ease"}
          zIndex={1}
          justifyContent={"center"}
        >
          {/* Likes & Comments Icons */}
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2}>
                {post.likes.length}
              </Text>
            </Flex>
            <Flex>
              <FaComment />
              <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Post Image */}
        <Image src={post.imageURL} alt="profile post" w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>

      {/* Post details using Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size={{ base: "3xl", md: "5xl" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex
              gap={4}
              w={{ base: "90%", sm: "70%", md: "full" }}
              mx={"auto"}
              maxH={"90vh"}
              minH={"50vh"}
            >
              <Flex
                borderRadius={4}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"whiteAlpha.300"}
                flex={1.5}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image src={post.imageURL} alt="profile post" />
              </Flex>
              <Flex flex={1} flexDir={"column"} px={10} display={{ base: "none", md: "flex" }}>
                {/* username and profile picture */}
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                  <Flex alignItems={"center"} gap={4}>
                    <Avatar src={userProfile.profilePicURL} size={"sm"} name="As a programmer" />
                    <Text fontWeight={"bold"} fontSize={12}>
                      {userProfile.username}
                    </Text>
                  </Flex>
                  {/* delete & close tab icon */}
                  {authUser?.uid === userProfile.uid && (
                    <Button
                      size={"small"}
                      bg={"transparent"}
                      _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                      borderRadius={4}
                      gap={1}
                    >
                      <MdDelete size={20} cursor={"pointer"} />
                    </Button>
                  )}
                </Flex>
                <Divider my={4} bg={"gray.500"} />

                {/* Comments section */}
                {/* overflowY:"auto" --- adds a scroll bar when content overflows the top and bottom edges */}
                <VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                  <Comment
                    createdAt="12h ago"
                    username="Dan Abramov"
                    profilePic="/avatar1.png"
                    text="Nice pic!"
                  />
                  <Comment
                    createdAt="3h ago"
                    username="Ryan Florence"
                    profilePic="/avatar2.png"
                    text="Great job guys!"
                  />
                  <Comment
                    createdAt="1d ago"
                    username="as a programmer"
                    profilePic="/profilepic.png"
                    text="Looking awesome! ✨"
                  />
                  <Comment
                    createdAt="12h ago"
                    username="Dan Abramov"
                    profilePic="/avatar1.png"
                    text="Captivating shot! 👁️✨"
                  />
                  <Comment
                    createdAt="3h ago"
                    username="Ryan Florence"
                    profilePic="/avatar2.png"
                    text="Absolutely Stunning"
                  />
                </VStack>
                <Divider my={4} bg={"gray.800"} />
                {/* Import Post Footer */}
                <PostFooter isProfilePage={true} />
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePost;
