import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProfileEditPage = () => {
  const [username, setUsername] = useState("");
  const [picture, setPicture] = useState("");
  const [about, setAbout] = useState("");

  const { userId } = useParams();
  const navigate = useNavigate();
  // Get the token from the localStorage
  const storedToken = localStorage.getItem("authToken");

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/profile/${userId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      /* 
          We update the state with the project data coming from the response.
          This way we set inputs to show the actual title and description of the project
        */
      const { username, picture, about } = await response.data;

      setUsername(username);
      setPicture(picture);
      setAbout(about);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  // ******** this method handles the file upload ********
  const handleFileUpload = async (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/upload`,
        uploadData
      );
      const data = await response.data.fileUrl;
      setPicture(data);
    } catch (error) {
      console.log("Error while uploading the file: ", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Create an object representing the body of the PUT request
    const requestBody = { username, picture, about };
    try {
      // Make a PUT request to update the project
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/profile/${userId}/edit`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response.status === 200) {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="editProfile">
      <div className="screen">
        <div className="screen__content">
          <h1>Edit My Profile</h1>
          <form onSubmit={handleFormSubmit} className="login">
            <div className="login__field">
              <img src={picture} className="edit-img" />
              <label htmlFor="file" className="picture__label">
                Modify My Profile Picture{" "}
              </label>
              <br></br>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e)}
                className="login__input picture__input"
                id="file"
              />
            </div>
            <div className="login__field">
              <label>Change My Username</label>
              <input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="login__input"
              />
            </div>
            <div className="login__field">
              <label>About Me</label>
              <br></br>
              <textarea
                name="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="login__input"
              />
            </div>
            <button type="submit" className="button login__submit">
              Save
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
