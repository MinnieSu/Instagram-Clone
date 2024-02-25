import CreatePosts from "./CreatePosts";
import Home from "./Home";
import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
  return (
    <>
      <Home />
      <Search />
      <Notifications />
      <CreatePosts />
      <ProfileLink />
    </>
  );
};

export default SidebarItems;
