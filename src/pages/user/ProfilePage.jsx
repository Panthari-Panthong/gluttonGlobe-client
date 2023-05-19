import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [userDetail, setUserDetail] = useState();

  const userData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile/${user._id}`
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
      {!userDetail && <h1>Loading...</h1>}
      {userDetail && (
        <>
          <h2>ProfilePage</h2>
          <img src={userDetail.picture} alt="user" style={{ width: "100px" }} />
          <h4>Username : {userDetail.username}</h4>
          <h4>Aboutme : {userDetail.about}</h4>
          <Link to={`/profile/${userDetail._id}/edit`}>Edit Profile</Link>
          <hr />
          <h4>{"Place I've been."}</h4>
          <hr />
          <h4>{"Place I want to visit"}</h4>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
