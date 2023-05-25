/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const PlaceEditPage = ({ refreshPost, placeId }) => {
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const createPost = async (event) => {
    event.preventDefault();
    const postToCreate = {
      user: user._id,
      comment,
      place: placeId,
    };
    const newPost = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts`,
      postToCreate
    );
    setComment("");
    refreshPost();
  };

  return (
    <div className="comment-container">
      <form onSubmit={createPost}>
        <label>
          <input
            type="text"
            name="comment"
            value={comment}
            className="comment-input"
            placeholder="What do you think...?"
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
        </label>
        <button className="comment-btn" type="submit" style={{ width: "50px" }}>
          Add
        </button>
      </form>
    </div>
  );
};

export default PlaceEditPage;
