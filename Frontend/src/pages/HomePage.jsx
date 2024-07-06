import { useEffect, useState } from "react";
import AllPostCard from "../components/AllPostCard";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [postDetail, setPostDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noPosts, setNoPosts] = useState(false);
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const { _id } = JSON.parse(localStorage.getItem("user"));

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/v1/post?pageNumber=${pageNumber}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) console.log("Can't fetch data");

      const data = await response.json();

      if (data.message === "No more posts available") {
        setNoPosts(true);
      } else {
        const { posts } = data;
        setPostDetails((prevPostDetail) => [...prevPostDetail, ...posts]);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInfiniteScroll = async () => {
    try {
      if (
        !loading &&
        !noPosts &&
        window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setTimeout(() => {
          setPageNumber(pageNumber + 1);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLike = async (postId, userId) => {
    try {
      const response = await fetch(`/api/v1/${postId}/handlelike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });

      const post = await response.json();
      if (response.ok) {
        const updatedPostDetails = postDetail.map((i) => {
          if (i._id === post._id) {
            return post;
          } else {
            return i;
          }
        });
        setPostDetails(updatedPostDetails);
      } else {
        if (post.token) {
          console.log("Token expired");
          navigate("/login");
        } else {
          console.error(response);
          throw new Error("Failed to handle likes");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  });

  return (
    <main className="pt-24 px-24 bg-gradient-to-r from-slate-300 to-slate-500/50">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  ">
        {postDetail.map((post, index) => (
          <AllPostCard
            key={index}
            userName={post.author.name}
            timestamp={post.timestamp}
            content={post.description}
            postId={post?._id}
            userId={_id}
            likes={post?.likes}
            userImage={post.imagePath}
            title={post.title}
            handleLike={handleLike}
          />
        ))}
      </div>
      {postDetail.length === 0 && (
        <div className=" flex justify-center items-center py-48 text-4xl h-screen">
          No Posts available
        </div>
      )}

      <div className="flex justify-center items-center">
        {postDetail.length && !noPosts && (
          <div className="animate-spin rounded-full h-11 w-11 border-t-6 border-b-2 border-blue-800 "></div>
        )}
      </div>
    </main>
  );
};

export default HomePage;
