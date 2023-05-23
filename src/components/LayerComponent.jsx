/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";

const LayerComponent = ({
  places,
  icon,
  handleUpdateBeen,
  handleUpdateVisit,
}) => {
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
