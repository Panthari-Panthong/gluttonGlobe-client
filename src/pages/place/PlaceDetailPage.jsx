import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import PlaceEditPage from "./PlaceEditPage";
import { AuthContext } from "../../context/AuthContext";
import PostDetail from "./PostDetail";
import Spinner from "react-bootstrap/esm/Spinner";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

const PlaceDetailPage = () => {
  const { id } = useParams();

  // To display the details related to the city
  const [cityDetails, setCityDetails] = useState(null);
  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places/${id}`
      );
      setCityDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  // To be able to add a comment or not
  const { isLoggedIn } = useContext(AuthContext);

  // To hide or show the edit comment component
  const [showHideEdit, setShowHideEdit] = useState(false);
  function toggle() {
    setShowHideEdit((showHideEdit) => !showHideEdit);
  }

  if (!cityDetails) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  return (
    <div className="placeDetail">
      <div>
        <div>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${cityDetails.iso2.toLowerCase()}.png`}
          />
        </div>
        <div>
          <h1>{cityDetails.city}</h1>
          <h2>{cityDetails.country}</h2>
        </div>

        <MapContainer
          center={[cityDetails.lat, cityDetails.lng]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ width: "15rem", height: "10rem" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[cityDetails.lat, cityDetails.lng]}
            icon={DefaultIcon}
          ></Marker>
        </MapContainer>
      </div>

      <div>
        <h2>Comments</h2>
        {/* Display all comments */}
        {cityDetails &&
          cityDetails.post.map((onepost) => (
            <PostDetail key={onepost._id} {...onepost} />
          ))}

        {/* Show/Hide comment form */}
        {!isLoggedIn ? (
          <Link to="/login">Log in now to add a comment</Link>
        ) : (
          <div>
            <button
              className="btn btn-outline-dark"
              data-mdb-ripple-color="dark"
              style={{ zIndex: "1" }}
              onClick={() => {
                toggle();
              }}
            >
              +
            </button>
            {showHideEdit && (
              <PlaceEditPage refreshPost={getDetails} placeId={id} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceDetailPage;
