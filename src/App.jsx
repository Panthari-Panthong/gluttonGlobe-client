import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import ProfilePage from "./pages/user/ProfilePage";
import MyMapPage from "./pages/user/MyMapPage";
import PlaceDetailPage from "./pages/place/PlaceDetailPage";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/myMap" element={<MyMapPage />} />
        {/* Solen */}
        <Route path="/places/:id" element={<PlaceDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
