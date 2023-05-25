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
    console.log(newPost);
    setComment("");
    refreshPost();
  };

  return (
    <div className="placeEditPage">
      <form onSubmit={createPost} className="login">
        <div className="login__field placeeditfield">
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="placeeditinput"
            placeholder="Type your comment..."
          ></input>
        </div>

        <button type="submit" className="addcommentbtn">
          Add
        </button>
      </form>
    </div>
  );
};

export default PlaceEditPage;
