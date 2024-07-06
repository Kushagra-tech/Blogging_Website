/* eslint-disable react/prop-types */
import { AiFillLike } from "react-icons/ai";
import { profilePicture } from "../assets/images";

const Card = ({
  userName,
  timestamp,
  content,
  postId,
  userId,
  likes,
  userImage,
  title,
  handleLike,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 rounded-xl overflow-hidden m-4  shadow-xl transition-transform transform hover:scale-105 bg-white">
        <img
          src={userImage}
          alt="User Uploaded"
          className="w-full h-96 aspect-video"
        />
        <div className="py-4 px-4 flex flex-col gap-0">
          <div className="flex items-center gap-2 relative">
            <img
              src={profilePicture}
              alt="Avatar"
              className="w-12 aspect-square rounded-full mr-4 border-2"
            />
            <div>
              <div className="text-lg font-medium text-gray-800">
                {userName}
              </div>
              <div className="font-medium text-gray-400/70 text-sm">
                {timestamp}
              </div>
            </div>
            <div className="flex items-center right-0 absolute">
              <button
                className={`hover:text-yellow-500 mr-4 ${
                  likes.includes(userId) ? "text-red-800" : "text-gray-500"
                }`}
                onClick={() => handleLike(postId, userId)}
              >
                <AiFillLike />
              </button>
              <span className="text-gray-600 font-semibold">
                {likes.length} likes
              </span>
            </div>
          </div>
          <h1 className="ml-4 mt-4 font-bold text-2xl">{title}</h1>
          <h2 className="ml-4 font-medium text-gray-900/70 text-md">
            {content}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Card;
