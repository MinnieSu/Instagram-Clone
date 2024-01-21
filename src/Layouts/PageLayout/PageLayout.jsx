// instead of adding the sidebar component to every page, we can add it only once to the PageLayout component
// and wrap the children with it. This way, we can have a sidebar on every pageexcept the AuthPage.
// useAuthState to retrieve and monitor the authentication state from Firebase. (react-firebase-hooks)
// create Nav bar - users see Navbar instead of Sidebar if they are not logged in and not authenticated.

import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import { auth } from "../../firebase/firebase";

const PageLayout = ({ children }) => {
  const { pathname } = useLocation();
  // check in the backsground if a user is logged in or not
  const [user, loading] = useAuthState(auth);
  // render Sidebar only when user is logged in. no sidebar when on authpage.
  const canRenderSidebar = pathname !== "/auth" && user;
  // render Navbar when user is not logged in && the status is not loading. no sidebar when on authpage.
  const canRenderNavbar = !user && !loading && pathname !== "/auth";
  // show a loading spinner while it checks the user is authenticated
  const checkingUserIsAuth = !user & loading;
  if (checkingUserIsAuth) return <PageLayoutSpinner />;

  return (
    <Flex flexDir={canRenderNavbar ? "column" : "row"}>
      {/* Sidebar on the left */}
      {canRenderSidebar ? (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      ) : null}

      {/* Navbar */}
      {canRenderNavbar ? <Navbar /> : null}

      {/* the page content on the right */}
      <Box flex={1} w={{ base: "calc(100%-70px)", md: "cal(100%-240px" }} mx={"auto"}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;

const PageLayoutSpinner = () => {
  return (
    <Flex flexDir={"column"} h={"100vh"} alignItems={"center"} justifyContent={"center"}>
      <Spinner size={"xl"} />
    </Flex>
  );
};

// Logic for Navbar, Sidebar and Spinner: 
// we check when to render the Sidebar && Navbar, depending on that we are rendering them in our template.
// if render Navbar: change flex direction to render the Navbar and page content vertically and ceter page content.
// if statement to check if the user is authicated, while it checks we show a spinner so that if the internet connection is low or user is null, then the user would know they need to wait a little bit.
