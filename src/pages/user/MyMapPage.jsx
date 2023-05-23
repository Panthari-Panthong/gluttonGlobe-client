import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "/src/App.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import LayerComponent from "/src/components/LayerComponent";
import LocationMarker from "/src/components/LocationMarker";
import L, { icon } from "leaflet";

const MyMapPage = () => {
  /* --- Store data --- */
  const { user } = useContext(AuthContext);
  const [allPlaces, setAllPlaces] = useState({ data: [] });
  const [userPlacesBeen, setUserPlacesBeen] = useState({ data: [] });
  const [userPlacesVisit, setUserPlacesVisit] = useState({ data: [] });
  const [position, setPosition] = useState(null);
  console.log(userPlacesBeen.data);

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

  /* --- Fetch saved places from the user --- */
  const fetchUserPlaces = async () => {
    const storedToken = localStorage.getItem("authToken");
    if (user) {
      try {
        const verifiedUserPlace = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mymap/${user._id}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        setUserPlacesBeen({
          data: verifiedUserPlace.data.placesFromUser[0].placesBeenFromUser,
        });
        setUserPlacesVisit({
          data: verifiedUserPlace.data.placesFromUser[0].placesVisitFromUser,
        });
      } catch (error) {
        console.log("error from fetching saved places from the user", error);
      }
    }
  };

  /* Add the place to user's placesBeen */
  const handleUpdateBeen = async (place) => {
    setUserPlacesBeen({ data: [...userPlacesBeen.data, place] });
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/mymap/addtoBeen/${user._id}`,
        {
          placesBeen: place,
        }
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  /* Add the place to user's placesVisit */
  const handleUpdateVisit = async (place) => {
    setUserPlacesVisit({ data: [...userPlacesVisit.data, place] });
    try {
      console.log("Add to visit", place);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/mymap/addtoVisit/${user._id}`,
        {
          placesVisit: place,
        }
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPlaces();
    fetchUserPlaces();
  }, []);

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
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={"Places want to go"}>
            <LayerGroup>
              <LayerComponent
                places={userPlacesVisit}
                icon={yellowIcon}
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"All Places"}>
            <LayerGroup>
              <LayerComponent
                places={allPlaces}
                icon={blueIcon}
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MyMapPage;
