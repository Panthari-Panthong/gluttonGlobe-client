import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import PlaceEditPage from "./PlaceEditPage";
import { AuthContext } from "../../context/AuthContext";

const PlaceDetailPage = () => {
  const { id } = useParams();

  // To display the details related to the city
  const [cityDetails, setCityDetails] = useState(null);
  const getDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places/${id}`
      );
      console.log(response);
      setCityDetails(response.data);
      console.log(cityDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  // To be able to add a comment or not
  const { isLoggedIn } = useContext(AuthContext);

  // To hide or show the edit comment component
  const [showHideEdit, setShowHideEdit] = useState(false);
  function toggle() {
    setShowHideEdit((showHideEdit) => !showHideEdit);
  }

  if (!cityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
      </div>

      <MapContainer
        center={[cityDetails.lat, cityDetails.lng]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ width: "20rem", height: "20rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[cityDetails.lat, cityDetails.lng]}></Marker>
      </MapContainer>

      <div>
        <h2>Comments</h2>
        {/* Display all comments */}
        {cityDetails.post.length == 0 ? (
          <p>No comment yet to display...</p>
        ) : (
          cityDetails.post.map((onepost) => {
            return (
              <div key={onepost._id}>
                {/* <p>{onepost.user}</p> */}
                <p>{onepost.comment}</p>
              </div>
            );
          })
        )}

        {/* Show/Hide comment form */}
        {!isLoggedIn ? (
          <Link to="/login">Log in now to add a comment</Link>
        ) : (
          <div>
            <button
              onClick={() => {
                toggle();
              }}
            >
              Add a comment
            </button>
            {showHideEdit && <PlaceEditPage />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceDetailPage;
