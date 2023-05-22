import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/user/profilePage";
import MyMapPage from "./pages/user/MyMapPage";
import ProfileEditPage from "./pages/user/ProfileEditPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
        <Route
          path="/profile/:userId/edit"
          element={
            <IsPrivate>
              <ProfileEditPage />
            </IsPrivate>
          }
        />
        <Route path="/myMap" element={<MyMapPage />} />
      </Routes>
    </div>
  );
}

export default App;
