import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavbarComponent = () => {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <div className="navbarComponent">
      {[false].map((expand) => (
        <Navbar key={expand} bg="#4a4e69" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/" className="navbarBrand">
              GluttonGlobe
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              <FontAwesomeIcon icon={faPlane} />
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="navbarOffcanvas"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  GluttonGlobe
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {/* isLoggedIn is true : show the Profile and My Map Links and Logout. */}
                  {isLoggedIn && (
                    <>
                      <Nav.Link href="/profile">My profile</Nav.Link>
                      <Nav.Link href="/myMap">My Map</Nav.Link>
                      <Button
                        className="button login__submit"
                        onClick={logOutUser}
                      >
                        Logout
                      </Button>
                    </>
                  )}

                  {/* isLoggedIn is false : show the Login and Sign Up Links */}
                  {!isLoggedIn && (
                    <>
                      <Nav.Link href="/signup">Sign Up</Nav.Link>
                      <Nav.Link href="/login">Login</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
};

export default NavbarComponent;
