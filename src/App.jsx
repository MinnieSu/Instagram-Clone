import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import TestPage from "./components/TestPage/TestPage";
// import useAuthStore from "./store/authStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
  // check if the user is authenticated from the authStore--> in the background checking in the local storage
  // const authUser = useAuthStore((state) => state.user);
  // however, it would be better and safer if we check user authentication from firebase.
  const [authUser] = useAuthState(auth);
  return (
    <>
      <PageLayout>
        <Routes>
          {/* if user is logged in, renders the Homepage, other wise renders the Authpage */}
          <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/auth" />} />
          <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" />} />
          <Route path="/asaprogrammer" element={<ProfilePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
