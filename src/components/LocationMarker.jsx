import { useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

function LocationMarker({ position, setPosition, icon }) {
  const map = useMap();
  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom(3));
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
    });
  }, [map]);

  return !position ? (
    <Marker position={[51.505, -0.09]} icon={icon}>
      {" "}
      <Popup>
        You are here. <br />
      </Popup>
    </Marker>
  ) : (
    <Marker position={position} icon={icon}>
      {" "}
      <Popup>
        You are here. <br />
      </Popup>
    </Marker>
  );
}

export default LocationMarker;
