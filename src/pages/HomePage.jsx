import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkerComponent from "../components/MarkerComponent";

const HomePage = () => {
  const [cities, setCities] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/places`
      );
      const data = await response.data;
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="homePage">
      <MapContainer
        center={[51.505, -0.09]}
        zoom={5}
        scrollWheelZoom={false}
        className="leaflet-container"
        style={{ width: "100%", height: "80vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerComponent cities={cities} />
      </MapContainer>
    </div>
  );
};

export default HomePage;
