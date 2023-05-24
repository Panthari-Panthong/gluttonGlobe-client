/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import { v4 as uuidv4 } from "uuid"; // for test

const LayerComponent = ({
  places,
  icon,
  handleAddBeen,
  handleAddVisit,
  handleUpdateBeen,
  handleUpdateVisit,
  // handleRemovePlace,
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
              key={uuidv4()}
            >
              <Popup autoClose={false}>
                <h3>{place.city}</h3>
                <button
                  onClick={() => {
                    handleAddBeen(place);
                    handleUpdateVisit(place);
                  }}
                >
                  Been there
                </button>
                <button
                  onClick={() => {
                    handleAddVisit(place);
                    handleUpdateBeen(place);
                  }}
                >
                  Want to visit
                </button>
                {/* <button
                  onClick={() => {
                    handleRemovePlace(place);
                  }}
                >
                  Remove from my list
                </button> */}
                <Link to={`/places/${place._id}`}>Detail</Link>
              </Popup>
            </Marker>
          );
        })
      )}
    </div>
  );
};

export default LayerComponent;
