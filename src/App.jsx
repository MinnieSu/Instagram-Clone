import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import TestPage from "./components/TestPage/TestPage";
import useAuthStore from "./store/authStore";

function App() {
  const authUser = useAuthStore((state) => state.user);
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
