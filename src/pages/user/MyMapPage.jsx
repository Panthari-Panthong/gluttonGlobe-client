import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "/src/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkerComponent from "/src/components/MarkerComponent";

/*const payloadUser = {
  email: "test@app",
  password: "1234",
  username: "test",
  picture: "",
  placesBeen: ["6467864c5225b7b82a5bbc88"], // Tokyo
  placesVisit: ["6467864c5225b7b82a5bbc89"], // Jarkata
};*/

const MyMapPage = () => {
  const [cities, setCities] = useState();
  // Store User Data
  const [userId, setUserId] = useState();
  const [myPlaces, setMyPlaces] = useState({
    myPlacesBeen: [],
    myPlacesVisit: [],
  });

  const fetchPlaceData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places`
      );
      const data = await response.data;
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const fetchUserData = async () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const verifiedUser = await response.data;
        setUserId(verifiedUser._id);
        // console.log("verifiedUser", verifiedUser._id);
        // console.log("userId", userId);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchPlaceData();
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerComponent cities={cities} />
      </MapContainer>
    </div>
  );
};

export default MyMapPage;
