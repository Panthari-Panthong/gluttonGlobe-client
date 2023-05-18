import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/signup"}>Signup</Link>
      <Link to={"/login"}>Login</Link>
      <Link to={"/profile"}>My profile</Link>
      <Link to={"/myMap"}>My Map</Link>
    </div>
  );
};

export default Navbar;
