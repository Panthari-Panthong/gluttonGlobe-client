/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const IsAnon = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  // If the authentication is still loading
  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    // If the user is logged in, navigate to the profile page
    return <Navigate to="/profile" />;
  } else {
    // If the user is not logged in, allow to see the page
    return children;
  }
};

export default IsAnon;
