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
    <div>
      <form onSubmit={createPost}>
        <label>
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></input>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PlaceEditPage;
