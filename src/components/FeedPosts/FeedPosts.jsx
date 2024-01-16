import { Container, Flex, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import FeedPost from "./FeedPost";

const FeedPosts = () => {
  // isLoading is first set to true when we render the page, after 2 seconds, isLoading will be set to false.
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });
  return (
    // if loading, show the loading effects using skeleton component
    <Container maxW={"container.sm"} py={10} px={2}>
      {isLoading &&
        [0, 1, 2, 3].map((item, index) => (
          <VStack key={index} gap={4} alignItems={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} alignItems={"flex-start"}>
                <Skeleton h={"10px"} w={"200px"} />
                <Skeleton h={"10px"} w={"200px"} />
              </VStack>
            </Flex>
            <Skeleton w={"full"} h={"500px"} />
          </VStack>
        ))}
      {/* if not loading, show the feedposts */}
      {!isLoading && (
        <>
          <FeedPost img="/img1.png" username="GracefulGlamour" avatar="/img1.png" />
          <FeedPost img="/img2.png" username="AlexAdventures" avatar="/img2.png" />
          <FeedPost img="/img3.png" username="RachelSunflower" avatar="/img3.png" />
          <FeedPost img="/img4.png" username="WildWoodMaverick" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};

export default FeedPosts;

// using props to pass in different contents for each Feedpost.
// add loading animation using <Skeleton> from ChaKhra
