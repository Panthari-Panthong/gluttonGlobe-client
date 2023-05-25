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
    <div className="profile-page">
      {!userDetail && (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {userDetail && (
        <>
          <div>
            <div className="container py-3 h-100 profile my-4">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-12 col-xl-4">
                  <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body text-center">
                      <div className="mb-4">
                        <img src={userDetail.picture} className="img-fluid" />
                      </div>
                      <h4 className="mb-2">
                        <b>Hello </b>
                        {userDetail.username}
                      </h4>
                      <p className="text-muted mb-4">{userDetail.about}</p>
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
          </div>

          <div className="container py-3 profile-place">
            <div className="title-styles">
              <h4>{"Places I've been"}</h4>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3 gap-3 flex-wrap justify-content-center">
              {userDetail &&
                userDetail.placesBeen.map((place) => {
                  return (
                    <Card
                      className="profile-place-card text-center"
                      key={place._id}
                    >
                      <Card.Body>
                        <img
                          className="py-2"
                          src={`https://flagpedia.net/data/flags/icon/72x54/${place.iso2.toLowerCase()}.png`}
                        />
                        <Card.Title className="title">{place.city}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {place.country}
                        </Card.Subtitle>
                        <Link
                          to={`/places/${place._id}`}
                          className="btn btn-primary btn-sm border-0"
                        >
                          Detail
                        </Link>
                      </Card.Body>
                    </Card>
                  );
                })}
            </div>
          </div>

          <div className="container py-3 profile-place">
            <div className="title-styles">
              <h4>{"Places I want to visit"}</h4>
            </div>
            <div className="d-flex flex-row bd-highlight mb-3 gap-3 flex-wrap profile-place-detail justify-content-center">
              {userDetail &&
                userDetail.placesVisit.map((place) => {
                  return (
                    <Card
                      className="profile-place-card text-center"
                      key={place._id}
                    >
                      <Card.Body>
                        <img
                          className="py-3"
                          src={`https://flagpedia.net/data/flags/icon/72x54/${place.iso2.toLowerCase()}.png`}
                        />
                        <Card.Title className="title">{place.city}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {place.country}
                        </Card.Subtitle>
                        <Link
                          to={`/places/${place._id}`}
                          className="btn btn-primary btn-sm border-0"
                        >
                          Detail
                        </Link>
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
