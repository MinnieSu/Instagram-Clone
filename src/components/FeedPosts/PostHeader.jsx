import { Avatar, Box, Button, Flex, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import useFollowUser from "../../hooks/UseFollowUser";
import { timeAgo } from "../../utils/timeAgo";

const PostHeader = ({ post, creatorProfile }) => {
  const { handleFollowUser, isFollowing, isUpdating } = useFollowUser(post.createdBy);
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
      <Flex alignItems={"center"} gap={2}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>
            <Avatar src={creatorProfile.profilePicURL} alt="user profile pic" size={"sm"} />
          </Link>
        ) : (
          <SkeletonCircle size={10} />
        )}
      </Flex>
      <Flex fontSize={12} fontWeight={"bold"} pl={2} mr={"auto"} alignItems={"center"}>
        {creatorProfile ? (
          <Link to={`/${creatorProfile.username}`}>{creatorProfile.username}</Link>
        ) : (
          <Skeleton h={"10px"} w={"100px"} />
        )}
        <Box color={"gray.500"} pl={2}>
          {timeAgo(post.createdAt)}
        </Box>
      </Flex>
      <Box cursor={"pointer"}>
        <Button
          size={"xs"}
          bg={"transparent"}
          fontSize={12}
          fontWeight={"bold"}
          color={"blue.500"}
          _hover={{ color: "white" }}
          transition={"0.2s ease-in-out"}
          onClick={handleFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Box>
    </Flex>
  );
};

export default PostHeader;
