/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

const MarkerComponent = ({ cities }) => {
  return (
    <div>
      {!cities ? (
        <h1>Loading...</h1>
      ) : (
        cities.data.map((city) => {
          return (
            <Marker position={[city.lat, city.lng]} key={city._id}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
                {/* Solen */}
                <Link to={`places/${city._id}`}>See more</Link>
              </Popup>
            </Marker>
          );
        })
      )}
    </div>
  );
};

export default MarkerComponent;
