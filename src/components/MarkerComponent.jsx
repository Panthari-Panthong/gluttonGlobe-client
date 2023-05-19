/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";

const MarkerComponent = ({ cities }) => {
  return (
    <div>
      {cities.data.map((city) => {
        return (
          <Marker position={[city.lat, city.lng]} key={city._id}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </div>
  );
};

export default MarkerComponent;
