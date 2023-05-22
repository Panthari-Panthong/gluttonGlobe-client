import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

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
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
};

export default SignupPage;
