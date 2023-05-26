import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import Image from "react-bootstrap/Image";
import { AuthContext } from "../../context/AuthContext";
import Card from "react-bootstrap/Card";

// eslint-disable-next-line react/prop-types
const PostDetail = ({ refreshPost, ...onepost }) => {
  // Get information from the user who posted (username and profile pic)
  const [foundUser, setFoundUser] = useState(null);
  const { user } = useContext(AuthContext);

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
    <Card style={{ width: "80vw", margin: "1rem 0" }}>
      <Card.Body className="card-body-comments">
        <div className="postDetail-container">
          {!foundUser ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div className="postDetail">
              <div className="postUser">
                <Image></Image>
                <div style={{ width: "100px" }}>
                  <img
                    src={foundUser.data.picture}
                    alt="User's profile pic"
                    style={{ width: "30px" }}
                  ></img>
                  <p style={{ color: "#5c5696" }}>{foundUser.data.username}</p>
                  {user && onepost.user == user._id && (
                    <Button
                      className="remove-comment-btn"
                      onClick={() => onDelete(onepost._id)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
              <div className="postText-container">
                <p>{onepost.comment}</p>
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostDetail;
