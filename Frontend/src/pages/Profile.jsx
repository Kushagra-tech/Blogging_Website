import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import verifyToken from "../helpers/verify";
import { profilePicture } from "../assets/images";
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, []);
  useEffect(() => {
    verifyToken().then((res) => {
      if (res) {
        navigate("/profile");
      } else {
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      {user && (
        <div className="bg-white rounded-lg shadow-lg shadow-orange-600/30 border-2 border-sky-300/20 p-6 flex items-center flex-col justify-center min-w-[300px] transform transition-transform hover:scale-105">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-48 rounded-full mr-4"
          />
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-3xl font-bold tracking-wider">{user.name}</h2>
            <p className="text-gray-600">{user.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
