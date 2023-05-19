import { Link } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <div>
      {/* isLoggedIn is true : show the Profile and My Map Links and Logout. */}
      {/* {isLoggedIn && (
        <>
          <Link to="/profile">My profile</Link>
          <Link to="/myMap">My Map</Link>
          <button onClick={logOutUser}>Logout</button>
        </>
      )} */}

      {/* isLoggedIn is false : show the Login and Sign Up Links */}
      {/* {!isLoggedIn && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )} */}
      <Link to="/signup">Sign Up</Link>
      <Link to="/login">Login</Link>
      <Link to="/profile">My profile</Link>
      <Link to="/myMap">My Map</Link>
      <button onClick={logOutUser}>Logout</button>
    </div>
  );
};

export default Navbar;
