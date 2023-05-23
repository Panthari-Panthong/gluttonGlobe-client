import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <>
      <footer>
        <div className="footer">
          <div className="row">
            <Link to="#">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link to="#">
              <i className="fab fa-twitter"></i>
            </Link>
          </div>
          <div className="row">
            <ul>
              <li>
                <Link to="#">Contact us</Link>
              </li>
              <li>
                <Link to="#">Our Services</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="#">Career</Link>
              </li>
            </ul>
          </div>
          <div className="row">
            © 2023 Gluttonglobe - All rights reserved || Designed By: Tzu-Yun,
            Panthari & Solen
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
