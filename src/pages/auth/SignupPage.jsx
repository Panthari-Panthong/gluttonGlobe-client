import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLock, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, username };

    try {
      // Make an axios request to the API
      // If the POST request is a successful redirect to the login page
      // If the request resolves with an error, set the error message in the state
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        requestBody
      );

      if (response.status === 201) {
        // navigate to the login page after the user has successfully signed up
        navigate("/login");
      }
    } catch (error) {
      if (error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
  };

  return (
    <div className="signupPage">
      <div className="signupScreen">
        <div className="screen__content">
          <form onSubmit={handleSignupSubmit} className="login">
            <div className="login__field">
              <FontAwesomeIcon icon={faLock} className="login_icon" />
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="login__input"
                placeholder="Username"
              />
            </div>
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
              <span className="button__text">Sign Up Now</span>
              <FontAwesomeIcon icon={faChevronRight} className="button_icon" />
            </button>
          </form>

          <div className="loginAdditionalText">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape5"></span>
          <span className="screen__background__shape screen__background__shape6"></span>
          <span className="screen__background__shape screen__background__shape7"></span>
          <span className="screen__background__shape screen__background__shape8"></span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
