import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "/src/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkerComponent from "/src/components/MarkerComponent";
import LayerComponent from "/src/components/LayerComponent";

const MyMapPage = () => {
  /* --- Store data --- */
  const [userId, setUserId] = useState();
  const [allPlaces, setAllPlaces] = useState();
  const [userPlaces, setUserPlaces] = useState({
    placesBeen: [],
    placesVisit: [],
  });

  /* --- Fetch data of all places --- */
  const fetchAllPlaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places`
      );
      const data = await response.data;
      setAllPlaces(data);
      //console.log("Data from fetching all places", data);
    } catch (error) {
      console.log(error);
    }
  };

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  /* --- Fetch userId from the user --- */
  const fetchUserId = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        const verifiedUser = await response.data;
        setUserId(verifiedUser._id);
        // console.log(userId);
      } catch (error) {
        console.log("error from fetching userId", error);
      }
    }
  };

  /* --- Fetch saved places from the user --- */
  const fetchUserPlaces = async () => {
    if (userId) {
      try {
        const verifiedUserPlace = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/places/${userId}`
        );
        setUserPlaces({
          placesBeen:
            verifiedUserPlace.data.placesFromUser[0].placesBeenFromUser,
          placesVisit:
            verifiedUserPlace.data.placesFromUser[0].placesVisitFromUser,
        });
        //console.log("placesFromUser:", userPlaces);
      } catch (error) {
        console.log("error from fetching saved places from the user", error);
      }
    }
  };

  useEffect(() => {
    fetchAllPlaces();
  }, []);

  useEffect(() => {
    fetchUserId();
  }, [userId]);

  useEffect(() => {
    fetchUserPlaces();
  }, [userPlaces]); // Have issue of infinie execution

  return (
    <div>
      <MapContainer
        center={[40.7608, -111.891]}
        zoom={8}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LayerComponent allPlaces={allPlaces} userPlaces={userPlaces} />
      </MapContainer>
    </div>
  );
};

export default MyMapPage;
