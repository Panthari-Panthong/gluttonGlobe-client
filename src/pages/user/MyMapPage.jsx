import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "/src/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LayerComponent from "/src/components/LayerComponent";
import LocationMarker from "/src/components/LocationMarker";
import L, { icon } from "leaflet";

const MyMapPage = () => {
  /* --- Store data --- */
  const [userId, setUserId] = useState();
  const [allPlaces, setAllPlaces] = useState({ data: [] });
  const [userPlacesBeen, setUserPlacesBeen] = useState({ data: [] });
  const [userPlacesVisit, setUserPlacesVisit] = useState({ data: [] });
  const [position, setPosition] = useState(null);

  /* --- Create the Icons --- */
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [40, 40],
      shadowSize: [100, 100],
      shadowAnchor: [14, 62],
    },
  });

  const greenIcon = new LeafIcon({
    iconUrl: "/src/assets/pin-con/pin-green.png",
  });

  const blueIcon = new LeafIcon({
    iconUrl: "/src/assets/pin-con/pin-blue.png",
  });

  const yellowIcon = new LeafIcon({
    iconUrl: "/src/assets/pin-con/pin-yellow.png",
  });

  const redIcon = new LeafIcon({
    iconUrl: "/src/assets/pin-con/pin-red.png",
  });

  /* --- Fetch data of all places --- */
  const fetchAllPlaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places`
      );
      //console.log(response);
      const data = await response.data;
      setAllPlaces(data);
      console.log(data);
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
        console.log(userId);
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
        setUserPlacesBeen({
          data: verifiedUserPlace.data.placesFromUser[0].placesBeenFromUser,
        });
        setUserPlacesVisit({
          data: verifiedUserPlace.data.placesFromUser[0].placesVisitFromUser,
        });
        // console.log("userPlacesBeen", userPlacesBeen);
        // console.log("userPlacesVisit:", userPlacesVisit);
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
  }, [userId, userPlacesBeen, userPlacesVisit]); // Have issue of infinite execution

  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={10}
        scrollWheelZoom={false}
        className="leaflet-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          icon={greenIcon}
          position={position}
          setPosition={setPosition}
        />
        <LayersControl position="topright">
          <LayersControl.Overlay name={"Places have been"}>
            <LayerGroup>
              <LayerComponent
                places={userPlacesBeen}
                icon={redIcon}
                userId={userId}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={"Places want to go"}>
            <LayerGroup>
              <LayerComponent
                places={userPlacesVisit}
                icon={yellowIcon}
                userId={userId}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"All Places"}>
            <LayerGroup>
              <LayerComponent
                places={allPlaces}
                icon={blueIcon}
                userId={userId}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MyMapPage;
