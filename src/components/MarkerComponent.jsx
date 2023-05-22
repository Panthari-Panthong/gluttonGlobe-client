/* eslint-disable react/prop-types */
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

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
                      <li className="list-group-item">Latitude : {city.lat}</li>
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
