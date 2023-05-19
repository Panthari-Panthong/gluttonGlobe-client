import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

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
      if (!error) {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      }
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>{"Don't have an account yet?"}</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
};

export default LoginPage;
