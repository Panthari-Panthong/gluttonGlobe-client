import axios from "axios";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useParams } from "react-router-dom";

const PlaceDetailPage = () => {
  const { id } = useParams();

  const [cityDetails, setCityDetails] = useState(null);
  // const [posts, setPosts] = useState([]) for posts

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

  if (!cityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${cityDetails.iso3
              .slice(0, -1)
              .toLowerCase()}.png`}
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
        {/* Add a comment form */}
        <button>Add a comment</button>
      </div>
    </div>
  );
};

export default PlaceDetailPage;
