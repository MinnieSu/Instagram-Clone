import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layouts/PageLayout/PageLayout";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import TestPage from "./components/TestPage/TestPage";

function App() {
  return (
    <>
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/asaprogrammer" element={<ProfilePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </PageLayout>
    </>
  );
}

export default App;
