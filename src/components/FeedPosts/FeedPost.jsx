import { Box, Image } from "@chakra-ui/react";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import useGetUserProfileById from "../../hooks/useGetUserProfileById";

const FeedPost = ({ post }) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box my={2} overflow={"hidden"} borderRadius={4}>
        <Image src={post.imageURL} alt={"Feed Post Image"} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  );
};

export default FeedPost;

// pass the post and userProfile to <PostHeader /> and <PostFooter/>, 
// to render profilePic, username, likes, follow & unfollow, timeAgo