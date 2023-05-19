import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PlaceEditPage = () => {
  const [comment, setComment] = useState("");
  const { place } = useParams();
  // const user found if logged in
  const user = "";

  const createPost = async (event) => {
    event.preventDefault();
    const postToCreate = {
      user,
      comment,
      place,
    };
    const newPost = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/posts/new`,
      postToCreate
    );
    console.log(newPost);
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
      </form>
    </div>
  );
};

export default PlaceEditPage;
