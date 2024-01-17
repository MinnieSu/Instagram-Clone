import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProfilePost from "./ProfilePost";
const ProfilePosts = () => {
  // create loading effects using skeleton compoenent from ChaKra
  // set useState: isLoading is true at first when rendering page, after 2 seconds we render the posts and set IsLoading to false
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  });

  return (
    <Grid templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(3,1fr)" }} gap={1} columnGap={1}>
      {isLoading &&
        [0, 1, 2, 3, 4, 5].map((item, index) => (
          <VStack key={index} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h={"300px"}>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!isLoading && (
        <>
          <ProfilePost img="/img1.png" />
          <ProfilePost img="/img2.png" />
          <ProfilePost img="/img3.png" />
          <ProfilePost img="/img4.png" />
        </>
      )}
    </Grid>
  );
};

export default ProfilePosts;
