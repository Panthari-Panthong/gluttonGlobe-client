import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import MarkerComponent from "../components/MarkerComponent";
import RadiusFilterComponent from "../components/RadiusFilterComponent";
import headerImage from "../assets/images/homepageheader.jpg";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//A function to scroll down
const handleClickScroll = () => {
  const element = document.getElementById("homepageMap");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const HomePage = () => {
  const [cities, setCities] = useState();
  const [radiusFilter, setRadiusFilter] = useState(null);

  const getRadiusFilter = () => radiusFilter;

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
      <div
        className="homepageHeader"
        style={{ backgroundImage: `url(${headerImage})` }}
      >
        <h1>Ready to embark on your next journey?</h1>
        <button className="btn-scroll" onClick={handleClickScroll}>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="homebutton_icon"
            size="2x"
          />
        </button>
      </div>
      <div id="homepageMap">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={5}
          scrollWheelZoom={false}
          className="leaflet-container"
          style={{ width: "100%", height: "80vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerComponent
            cities={cities}
            setRadiusFilter={setRadiusFilter}
            getRadiusFilter={getRadiusFilter}
          />

          <RadiusFilterComponent
            radiusFilter={radiusFilter}
            setRadiusFilter={setRadiusFilter}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default HomePage;
