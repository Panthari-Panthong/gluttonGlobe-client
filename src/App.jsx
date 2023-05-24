import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/user/profilePage";
import MyMapPage from "./pages/user/MyMapPage";

import PlaceDetailPage from "./pages/place/PlaceDetailPage";

import ProfileEditPage from "./pages/user/ProfileEditPage";

// Custom Route Components
// Protect specific pages
// Allow access only to authenticated users
import IsAnon from "./components/IsAnon";
// IsAnon
// make certain pages available only to the users who are not logged in

import IsPrivate from "./components/IsPrivate";
// IsPrivate
// private pages accessible only to the users who are logged in.

// 404 page
import ErrorPage from "./components/ErrorPage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
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
            // check if the user is logged in or not
            // access the content by props.children
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

        <Route path="/places/:id" element={<PlaceDetailPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
