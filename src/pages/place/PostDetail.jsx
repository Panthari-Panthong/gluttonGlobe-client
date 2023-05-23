import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from "react-bootstrap/Image";

const PostDetail = ({ ...onepost }) => {
  // Get information from the user who posted (username and profile pic)
  const [foundUser, setFoundUser] = useState(null);

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${onepost.user}`
      );
      setFoundUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      {!foundUser ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="postDetail">
          <div className="postUser">
            <Image></Image>
            <img
              src={foundUser.data.picture}
              alt="User's profile pic"
              style={{ width: "50px" }}
            ></img>
            <p>{foundUser.data.username}</p>
          </div>

          <p>{onepost.comment}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
