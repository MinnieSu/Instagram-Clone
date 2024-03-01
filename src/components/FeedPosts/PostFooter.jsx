import { Flex, Button, Box, Text, InputGroup, InputRightElement, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import useLikePost from "../../hooks/useLikePost";
import usePostComment from "../../hooks/usePostComment";
import { timeAgo } from "../../utils/timeAgo";

const PostFooter = ({ post, isProfilePage, creatorProfile }) => {
  const { isCommenting, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  const commentRef = useRef(null);
  const { isLiked, likes, handleLikePost } = useLikePost(post);

  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };

  return (
    <Box mb={10} mt={"auto"}>
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        {/* like & comment icons */}
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
          {!isLiked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>
        <Box cursor={"pointer"} fontSize={18} onClick={() => commentRef.current.focus()}>
          <CommentLogo />
        </Box>
      </Flex>
      {/* counts of likes */}
      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>
      {/* show posted timestamp in profile page */}
      {isProfilePage && (
        <Text fontSize={12} color={"gray"}>
          Posted {timeAgo(post.createdAt)}
        </Text>
      )}
      {/* comments (used in FeedPosts in homepage, excluding ProfilePage) */}
      {!isProfilePage && (
        <>
          <Text fontSize={"sm"} fontWeight={700}>
            {creatorProfile?.username}{" "}
            <Text as={"span"} fontWeight={400}>
              Feeling Awesome for 2024!
            </Text>
          </Text>
          {/* counts of comments */}
          {post.comments.length > 0 && (
            <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
              View all {post.comments.length} comments
            </Text>
          )}
        </>
      )}

      {/* input for comments + post button */}
      <Flex alignItems={"center"} justifyContent={"space-between"} gap={2} w={"full"}>
        <InputGroup>
          <Input
            variant={"flushed"}
            placeholder={"Add a comment..."}
            fontSize={14}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            ref={commentRef}
          />
          <InputRightElement>
            <Button
              fontSize={14}
              color={"blue.500"}
              fontWeight={600}
              cursor={"pointer"}
              _hover={{ color: "white" }}
              bg={"transparent"}
              isLoading={isCommenting}
              onClick={handleSubmitComment}
            >
              Post
            </Button>
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Box>
  );
};

export default PostFooter;
