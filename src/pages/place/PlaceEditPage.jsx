import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const PlaceEditPage = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  // const user found if logged in
  const user = "";

  const createPost = async (event) => {
    event.preventDefault();
    const postToCreate = {
      user,
      comment,
      place: id,
    };
    const newPost = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/places/${id}`,
      postToCreate
    );
    setComment("");
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
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default PlaceEditPage;
