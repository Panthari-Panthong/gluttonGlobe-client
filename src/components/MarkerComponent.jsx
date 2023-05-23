/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";
import { useState } from "react";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const default_radius = 3000;

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const MarkerComponent = ({ cities, setRadiusFilter, getRadiusFilter }) => {
  const [radius, setRadius] = useState(default_radius);
  const radiusFilter = getRadiusFilter();

  let centerPoint;
  if (radiusFilter) {
    const { lat, lng } = radiusFilter.city;
    centerPoint = L.latLng(lat, lng);
  }

  return (
    <div>
      {!cities ? (
        <h1>Loading...</h1>
      ) : (
        cities.data
          .filter((currentCity) => {
            if (centerPoint) {
              const { lat, lng } = currentCity;
              const currentPoint = L.latLng(lat, lng);
              return (
                centerPoint.distanceTo(currentPoint) / 1000 <
                radiusFilter.radius
              );
            } else {
              return true;
            }
          })
          .map((city) => {
            return (
              <Marker
                position={[city.lat, city.lng]}
                key={city._id}
                icon={DefaultIcon}
              >
                <Popup>
                  <Card
                    style={{ width: "12rem" }}
                    className="pt-4 card text-center"
                  >
                    <Card.Img
                      className="mx-auto d-block"
                      variant="top"
                      style={{ width: "3rem" }}
                      src={`https://flagpedia.net/data/flags/icon/72x54/${city.iso2.toLowerCase()}.png`}
                    />
                    <Card.Body>
                      <Card.Title>{city.city}</Card.Title>
                      <Card.Text>{city.country}</Card.Text>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          Latitude : {city.lat}
                        </li>
                        <li className="list-group-item">
                          Longitude : {city.lng}
                        </li>
                      </ul>
                      <Link
                        className="btn btn-outline-info btn-sm"
                        to={`places/${city._id}`}
                      >
                        Detail
                      </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      <div className="d-flex flex-row gap-1">
                        <input
                          type="number"
                          min={0}
                          value={radius}
                          onChange={(e) => setRadius(Number(e.target.value))}
                          style={{ width: "100px" }}
                          className="form-control"
                        />
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm rounded-lg"
                          size="sm"
                          onClick={() =>
                            setRadiusFilter((prevState) => {
                              let newFilter;
                              if (prevState) {
                                if (radius === 0) {
                                  newFilter = prevState;
                                } else {
                                  const sameCity = prevState.city === city;
                                  const sameRadius =
                                    prevState.radius === radius;
                                  if (!sameCity || !sameRadius) {
                                    newFilter = { city, radius };
                                  }
                                }
                              } else if (radius !== 0) {
                                newFilter = { city, radius };
                              }
                              return newFilter;
                            })
                          }
                        >
                          Filter
                        </button>
                      </div>
                      <small id="emailHelp" className="form-text text-muted">
                        {"Filter by km"}
                      </small>
                    </Card.Footer>
                  </Card>
                </Popup>
              </Marker>
            );
          })
      )}
    </div>
  );
};

export default MarkerComponent;
