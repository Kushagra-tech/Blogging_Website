import { useEffect, useState } from "react";
import Card from "../components/Card";

const MyBlogs = () => {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const fetchData = async () => {
    try {
      const response = await fetch(`/api/v1/myPost/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setPostData([...data]);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [loading]);
  return (
    <div className="bg-gradient-to-r from-slate-300 to-slate-500/50 h-screen overflow-y-scroll">
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 pt-24 px-24">
          {postData.map((post, index) => (
            <Card
              key={index}
              userName={post.author.name}
              userAvatar={post.profilePicture}
              timestamp={post.timestamp}
              content={post.description}
              postId={post?._id}
              userId={_id}
              likes={post?.likes}
              load={setLoading}
              userImage={post.imagePath}
              title={post.title}
            />
          ))}
        </div>
      </div>
      {postData.length === 0 && (
        <div className="text-stone-600 py-48 text-lg flex justify-center items-center h-full">
          No Posts
        </div>
      )}
    </div>
  );
};
export default MyBlogs;
