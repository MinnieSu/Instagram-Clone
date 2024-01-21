// instead of adding the sidebar component to every page, we can add it only once to the PageLayout component
// and wrap the children with it. This way, we can have a sidebar on every pageexcept the AuthPage.
// useAuthState to retrieve and monitor the authentication state from Firebase. (react-firebase-hooks)

import { Box, Flex } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  // check in the backsground if a user is logged in or not
  const [user, loading, error] = useAuthState(auth);
  // render sidebar only when user is logged in. no sidebar when on authpage.
  const canRenderSidebar = pathname !== "/auth" && user;
  return (
    <Flex>
      {/* sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* the page content on the right */}
      <Box flex={1} w={{ base: "calc(100%-70px)", md: "cal(100%-240px" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;
