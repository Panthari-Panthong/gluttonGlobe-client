/* eslint-disable react/prop-types */
import { useState } from "react";
import { Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import L from "leaflet";

const LayerComponent = ({ allPlaces, userPlaces }) => {
  const [placesBeen, setPlacesBeen] = useState(userPlaces.placesBeen);
  const [placesVisit, setPlacesVisit] = useState(userPlaces.placesVisit);

  // Create the Icon
  const LeafIcon = L.Icon.extend({
    options: {
      iconSize: [50, 50],
      shadowSize: [100, 100],
      shadowAnchor: [14, 62],
    },
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

  //  Use the state hook:
  const [icon, setIcon] = useState(blueIcon);

  // This function will change the state's icon:
  const addBeen = (icon) => {
    if (icon.options.iconUrl === yellowIcon.options.iconUrl) {
      setIcon((current) => (current = blueIcon));
    } else {
      setIcon((current) => (current = redIcon));
    }
  };

  // This function will change the state's icon:
  const addVisit = (icon) => {
    if (icon.options.iconUrl === yellowIcon.options.iconUrl) {
      setIcon((current) => (current = blueIcon));
    } else {
      setIcon((current) => (current = yellowIcon));
    }
  };

  return (
    <>
      <LayersControl position="topright">
        {/* All places */}
        <LayersControl.Overlay name="All places">
          <LayerGroup>
            {!allPlaces ? (
              <h1>Loading...</h1>
            ) : (
              allPlaces.data.map((place) => {
                return (
                  <Marker position={[place.lat, place.lng]} key={place._id}>
                    <Popup>
                      <h3>{place.city}</h3>
                      <button onClick={() => addBeen(icon)}>Been there</button>
                      <button onClick={() => addVisit(icon)}>
                        Want to visit
                      </button>
                    </Popup>
                  </Marker>
                );
              })
            )}
          </LayerGroup>
        </LayersControl.Overlay>
        {/* Places I have been to */}
        <LayersControl.Overlay name="Places I have been to">
          <LayerGroup>
            {!placesBeen ? (
              <h1>Loading...</h1>
            ) : (
              placesBeen.map((place) => {
                return (
                  <Marker position={[place.lat, place.lng]} key={place._id}>
                    <Popup>
                      <h3>{place.city}</h3>
                      <button onClick={() => addVisit(icon)}>
                        Want to visit
                      </button>
                    </Popup>
                  </Marker>
                );
              })
            )}
          </LayerGroup>
        </LayersControl.Overlay>
        {/* Places I want to go */}
        <LayersControl.Overlay name="Places I want to visit">
          <LayerGroup>
            {!placesVisit ? (
              <h1>Loading...</h1>
            ) : (
              placesVisit.map((place) => {
                return (
                  <Marker position={[place.lat, place.lng]} key={place._id}>
                    <Popup>
                      <h3>{place.city}</h3>
                      <button onClick={() => addVisit(icon)}>
                        Want to visit
                      </button>
                    </Popup>
                  </Marker>
                );
              })
            )}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
      {/* <Marker position={[40.7608, -111.891]} icon={icon}>
        <Popup>
          <h1>Salt lake City</h1>
          <button onClick={() => addBeen(icon)}>Been there</button>
          <button onClick={() => addVisit(icon)}>Want to visit</button>
        </Popup>
      </Marker> */}
    </>
  );
};

export default LayerComponent;

/*
<div>
      {!cities ? (
        <h1>Loading...</h1>
      ) : (
        cities.data.map((city) => {
          return (
            <Marker position={[city.lat, city.lng]} key={city._id}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          );
        })
      )}
    </div>
*/
