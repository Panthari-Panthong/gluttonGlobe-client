import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState();

  const userData = async () => {
    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile/${user._id}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      const data = await response.data;
      setUserDetail(data);
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, [user]);

  return (
    <div>
      {!userDetail && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {userDetail && (
        <>
          <div>
            <h2>Profile</h2>
            <div className="container py-5 h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-4">
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body text-center">
                      <div className="mt-3 mb-4">
                        <img
                          src={userDetail.picture}
                          className="img-fluid"
                          style={{ width: "180px", borderRadius: "10px" }}
                        />
                      </div>
                      <h4 className="mb-2">{userDetail.username}</h4>
                      <p className="text-muted mb-4">
                        About me : {userDetail.about}
                      </p>
                      <Link
                        to={`/profile/${userDetail._id}/edit`}
                        className="btn btn-outline-dark"
                        data-mdb-ripple-color="dark"
                        style={{ zIndex: "1" }}
                      >
                        Edit Profile
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ------- */}
            {/* <img
              src={userDetail.picture}
              alt="user"
              style={{ width: "100px" }}
            />
            <h4>Username : {userDetail.username}</h4>
            <h4>Aboutme : {userDetail.about}</h4>
            <Link to={`/profile/${userDetail._id}/edit`}>Edit Profile</Link> */}
            {/* ------- */}
          </div>
          <hr />
          <div>
            <h4>{"Place I've been."}</h4>
            <div className="d-flex flex-row bd-highlight mb-3 gap-2">
              {userDetail &&
                userDetail.placesBeen.map((place) => {
                  return (
                    <Card style={{ width: "18rem" }} key={place._id}>
                      <Card.Body>
                        <img
                          src={`https://flagpedia.net/data/flags/icon/72x54/${place.iso3
                            .slice(0, -1)
                            .toLowerCase()}.png`}
                        />
                        <Card.Title>{place.city}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {place.country}
                        </Card.Subtitle>
                        <Link to={`/places/${place._id}`}>Detail</Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          </div>
          <hr />
          <div>
            <h4>{"Place I want to visit"}</h4>
            <div className="d-flex flex-row bd-highlight mb-3 gap-2">
              {userDetail &&
                userDetail.placesVisit.map((place) => {
                  return (
                    <Card style={{ width: "18rem" }} key={place._id}>
                      <Card.Body>
                        <img
                          src={`https://flagpedia.net/data/flags/icon/72x54/${place.iso3
                            .slice(0, -1)
                            .toLowerCase()}.png`}
                        />
                        <Card.Title>{place.city}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {place.country}
                        </Card.Subtitle>
                        <Link to={`/places/${place._id}`}>Detail</Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
