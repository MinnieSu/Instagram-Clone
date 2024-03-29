import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import usePostComment from "../../hooks/usePostComment";
import Comment from "../Comment/Comment";

const CommentsModal = ({ isOpen, onClose, post }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  //   used to reference the Input element
  const commentRef = useRef(null);

  //   used to reference the Flex component wraping the comments.
  const commentsContainerRef = useRef(null);

  const handleSubmitComment = async (e) => {
    // do not refresh the page, prevent it
    e.preventDefault();
    await handlePostComment(post.id, commentRef.current.value);
    commentRef.current.value = "";
  };
  useEffect(() => {
    const scrollToBottom = () => {
      commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
    };
    if (isOpen) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [isOpen, post.comments.length]); //run this funciton when the model is opened and new comment is added.
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInLeft">
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Comments</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex
            mb={4}
            gap={4}
            flexDir={"column"}
            maxH={"250px"}
            overflowY={"auto"}
            ref={commentsContainerRef}
          >
            {/* Render all comments of the post */}
            {post.comments
              .slice() // Create a copy of the comments array
              .sort((a, b) => a.createdAt - b.createdAt) // Sort the comments by createdAt in ascending order
              .map((comment, index) => (
                <Comment key={index} comment={comment} /> //optional: add a property comment.id when creating newComment
              ))}
          </Flex>
          <form onSubmit={handleSubmitComment} style={{ marginTop: "2rem" }}>
            <Input placeholder="Comment" size={"sm"} ref={commentRef} />
            <Flex w={"full"} justifyContent={"flex-end"}>
              <Button type="submit" ml={"auto"} size={"sm"} my={4} isLoading={isCommenting}>
                Post
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CommentsModal;
