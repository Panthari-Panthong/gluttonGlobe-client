import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  // get authenticateUser from the context
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const requestBody = { email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        requestBody
      );

      if (response.status === 200) {
        // console.log("JWT token", response.data.authToken);

        // Save the token in the localStorage.
        const data = await response.data;
        storeToken(data.authToken);

        // Verify the token by sending a request, stored in the browser
        // to the server's JWT validation endpoint.
        // updates the state variables isLoggedIn, user and isLoading
        authenticateUser();

        navigate("/profile");
      }
    } catch (error) {
      if (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
  };

  return (
    <div className="loginPage">
      <div className="screen">
        <div className="screen__content">
          <form onSubmit={handleLoginSubmit} className="login">
            <div className="login__field">
              <FontAwesomeIcon icon={faUser} className="login_icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="login__input"
                placeholder="Email"
              />
            </div>

            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login_icon" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="login__input"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="button login__submit">
              <span className="button__text">Log in now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button_icon" />
            </button>
          </form>

          <div className="loginAdditionalText">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
