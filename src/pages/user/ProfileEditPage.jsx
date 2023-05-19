import { useParams } from "react-router-dom";

const ProfileEditPage = () => {
  const { userId } = useParams();
  console.log(userId);
  return (
    <div>
      <h1>Edit Profile</h1>
    </div>
  );
};

export default ProfileEditPage;
