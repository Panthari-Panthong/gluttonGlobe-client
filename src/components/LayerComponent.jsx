/* eslint-disable react/prop-types */
import { LayerGroup, LayersControl, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import axios from "axios";

const LayerComponent = ({ places, icon, userId }) => {
  /* Add the place to user's placesBeen */
  const handleUpdateBeen = async (place) => {
    console.log("userId", userId);
    try {
      console.log("Add to been", place);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/places/addtoBeen/${userId}`,
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
    console.log("userId", userId);
    try {
      console.log("Add to visit", place);
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/places/addtoVisit/${userId}`,
        {
          placesVisit: place,
        }
      );
      console.log(response.data); // Log the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {!places ? (
        <h1>Loading...</h1>
      ) : (
        places.data.map((place) => {
          return (
            <Marker
              position={[place.lat, place.lng]}
              icon={icon}
              key={place._id}
            >
              <Popup>
                <h3>{place.city}</h3>
                <button onClick={() => handleUpdateBeen(place)}>
                  Been there
                </button>
                <button onClick={() => handleUpdateVisit(place)}>
                  Want to visit
                </button>
              </Popup>
            </Marker>
          );
        })
      )}
    </div>
  );
};

export default LayerComponent;
