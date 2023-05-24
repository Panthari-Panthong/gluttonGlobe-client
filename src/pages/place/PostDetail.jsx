import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from "react-bootstrap/Image";
import { AuthContext } from "../../context/AuthContext";

// eslint-disable-next-line react/prop-types
const PostDetail = ({ refreshPost, ...onepost }) => {
  // Get information from the user who posted (username and profile pic)
  const [foundUser, setFoundUser] = useState(null);
  const { user } = useContext(AuthContext);

  console.log(user);

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

  // Delete the comment
  const onDelete = (postId) => {
    axios.delete(`${import.meta.env.VITE_API_URL}/api/posts/${postId}`);
    refreshPost();
  };

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
          {user && onepost.user == user._id && (
            <Button onClick={() => onDelete(onepost._id)}>Remove</Button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
