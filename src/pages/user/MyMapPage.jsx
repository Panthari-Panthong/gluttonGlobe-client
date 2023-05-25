import {
  LayerGroup,
  LayersControl,
  MapContainer,
  TileLayer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../../App.css";
import "../../index.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import LayerComponent from "/src/components/LayerComponent";
import LocationMarker from "/src/components/LocationMarker";
import L, { icon } from "leaflet";
import pinGreen from "../../assets/pin-con/pin-green.png";
import pinPurple from "../../assets/pin-con/pin-purple.png";
import pinRed from "../../assets/pin-con/pin-red.png";
import pinYellow from "../../assets/pin-con/pin-yellow.png";

const MyMapPage = () => {
  /* --- Store data --- */
  const { user } = useContext(AuthContext);
  const [allPlaces, setAllPlaces] = useState({ data: [] });
  const [userPlacesBeen, setUserPlacesBeen] = useState({ data: [] });
  const [userPlacesVisit, setUserPlacesVisit] = useState({ data: [] });
  const [position, setPosition] = useState(null);
  //const [errorMessage, setErrorMessage] = useState("");

  /* --- Create the Icons --- */
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [30, 30],
      shadowSize: [100, 100],
      shadowAnchor: [14, 62],
    },
  });

  const greenIcon = new LeafIcon({
    iconUrl: pinGreen,
  });

  const purpleIcon = new LeafIcon({
    iconUrl: pinPurple,
  });

  const yellowIcon = new LeafIcon({
    iconUrl: pinYellow,
  });

  const redIcon = new LeafIcon({
    iconUrl: pinRed,
  });

  /* --- Fetch data of all places --- */
  const fetchAllPlaces = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places`
      );
      const data = await response.data;
      setAllPlaces(data);
    } catch (error) {
      console.log(error);
    }
  };

  // const storeToken = (token) => {
  //   localStorage.setItem("authToken", token);
  // };

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

  /* --- Add the place to user's placesBeen --- */
  const handleAddBeen = async (place) => {
    const storedToken = localStorage.getItem("authToken");
    // console.log(storedToken);
    if (!userPlacesBeen.data.includes(place)) {
      setUserPlacesBeen({ data: [...userPlacesBeen.data, place] });
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/mymap/addtoBeen/${user._id}`,
          {
            placesBeen: place,
          },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* --- Add the place to user's placesVisit --- */
  const handleAddVisit = async (place) => {
    const storedToken = localStorage.getItem("authToken");
    if (!userPlacesVisit.data.includes(place)) {
      setUserPlacesVisit({ data: [...userPlacesVisit.data, place] });
      try {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/mymap/addtoVisit/${user._id}`,
          {
            placesVisit: place,
          },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  /* --- Update user's placesBeen ---*/
  // If the place has been added to placesBeen + now moving to placesVisit
  // Then remove it from placesBeen
  const handleUpdateBeen = async (place) => {
    const storedToken = localStorage.getItem("authToken");
    // Update User's information in frontend
    if (userPlacesBeen.data.includes(place)) {
      const index = userPlacesBeen.data.indexOf(place);
      const removePlacesBeen = userPlacesBeen.data.splice(index, 1);
      setUserPlacesBeen(userPlacesBeen);
    }
    // Update User's information in backend
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/mymap/updateBeen/${user._id}`,
        {
          newPlacesBeen: place,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* --- Update user's placesVisit ---*/
  // If the place has been added to placesVisit + now moving to placesBeen
  // Then remove it from placesVisit
  const handleUpdateVisit = async (place) => {
    const storedToken = localStorage.getItem("authToken");
    // Update User's information in frontend
    if (userPlacesVisit.data.includes(place)) {
      const index = userPlacesVisit.data.indexOf(place);
      const removePlacesVisit = userPlacesVisit.data.splice(index, 1);
      setUserPlacesVisit(userPlacesVisit);
    }
    // Update User's information in backend
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/mymap/updateVisit/${user._id}`,
        {
          newPlacesVisit: place,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
    } catch (error) {
      console.log(error);
    }
  };

  /* --- Remove the place from user's list--- */
  // const handleRemovePlace = async (place) => {
  //   const storedToken = localStorage.getItem("authToken");
  //   // Update User's information in frontend
  //   if (userPlacesBeen.data.includes(place)) {
  //     const indexBeen = userPlacesBeen.data.indexOf(place);
  //     const removePlacesBeen = userPlacesBeen.data.splice(indexBeen, 1);
  //     // setUserPlacesBeen(userPlacesBeen);
  //   }
  //   if (userPlacesVisit.data.includes(place)) {
  //     const indexVisit = userPlacesVisit.data.indexOf(place);
  //     const removePlacesVisit = userPlacesVisit.data.splice(indexVisit, 1);
  //     // setUserPlacesVisit(userPlacesVisit);
  //   }
  //   try {
  //     const response = await axios.put(
  //       `${import.meta.env.VITE_API_URL}/api/mymap/removePlace/${user._id}`,
  //       {
  //         placeToRemove: place,
  //       },
  //       { headers: { Authorization: `Bearer ${storedToken}` } }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    fetchAllPlaces();
    fetchUserPlaces();
  }, []);

  return (
    <div className="myMapPage">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={10}
        scrollWheelZoom={false}
        className="leaflet-container"
        style={{ width: "100%", height: "80vh" }}
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
        <LayersControl position="topright" collapsed={false}>
          <LayersControl.Overlay name={"Places have been"}>
            <LayerGroup>
              <LayerComponent
                places={userPlacesBeen}
                icon={redIcon}
                handleAddBeen={handleAddBeen}
                handleAddVisit={handleAddVisit}
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
                // handleRemovePlace={handleRemovePlace}
              />
            </LayerGroup>
          </LayersControl.Overlay>

          <LayersControl.Overlay name={"Places want to go"}>
            <LayerGroup>
              <LayerComponent
                places={userPlacesVisit}
                icon={yellowIcon}
                handleAddBeen={handleAddBeen}
                handleAddVisit={handleAddVisit}
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
                // handleRemovePlace={handleRemovePlace}
              />
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name={"All Places"} checked>
            <LayerGroup>
              <LayerComponent
                places={allPlaces}
                icon={purpleIcon}
                handleAddBeen={handleAddBeen}
                handleAddVisit={handleAddVisit}
                handleUpdateBeen={handleUpdateBeen}
                handleUpdateVisit={handleUpdateVisit}
                // handleRemovePlace={handleRemovePlace}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MyMapPage;
