/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from "uuid"; // for test
import { Link } from "react-router-dom";
import { Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

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
                <Card
                  style={{ width: "12rem" }}
                  className="pt-4 card text-center"
                >
                  <Card.Img
                    className="mx-auto d-block"
                    variant="top"
                    style={{ width: "3rem" }}
                    src={`https://flagpedia.net/data/flags/icon/72x54/${place.iso2.toLowerCase()}.png`}
                  />
                  <Card.Title>{place.city}</Card.Title>
                  <Card.Text>{place.country}</Card.Text>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Latitude : {place.lat}</li>
                    <li className="list-group-item">Longitude : {place.lng}</li>
                  </ul>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      handleAddBeen(place);
                      handleUpdateVisit(place);
                    }}
                  >
                    I have been there
                  </Button>
                  <Button
                    variant="outline-warning"
                    onClick={() => {
                      handleAddVisit(place);
                      handleUpdateBeen(place);
                    }}
                  >
                    I want to visit there
                  </Button>
                  {/* <button
                  onClick={() => {
                    handleRemovePlace(place);
                  }}
                >
                  Remove from my list
                </button> */}
                  <Link
                    className="btn btn-outline-info btn-sm"
                    to={`/places/${place._id}`}
                  >
                    Detail
                  </Link>
                </Card>
              </Popup>
            </Marker>
          );
        })
      )}
    </div>
  );
};

export default LayerComponent;
