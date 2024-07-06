
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { profilePicture } from "../assets/images";

const Navbar = () => {
  const data = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    Cookies.remove("token");
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-[#46474A] py-4 px-28 flex items-center justify-between fixed w-full z-50">
      <div className="flex items-center gap-4">
        <img
          src={profilePicture}
          alt="User"
          className="w-12 aspect-square rounded-full"
        />
        <h2 className="text-3xl font-bold tracking-wider text-gray-200">
          {data?.name}
        </h2>
      </div>
      <div className="flex justify-end py-0">
        <ul className="flex items-center gap-4">
          <li className="mr-8">
            <Link
              to="/"
              className={`text-white hover:text-gray-200 ${
                isActive("/") ? "text-sky-300 font-bold" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li className="mr-8">
            <Link
              to="/profile"
              className={`text-white hover:text-gray-200 ${
                isActive("/profile") ? "text-sky-300 font-bold" : ""
              }`}
            >
              Profile
            </Link>
          </li>
          <li className="mr-8">
            <Link
              to="/blogs"
              className={`text-white hover:text-gray-200 ${
                isActive("/blogs") ? "text-sky-300 font-bold" : ""
              }`}
            >
              MyBlogs
            </Link>
          </li>
          <li>
            <button onClick={logout} className="text-white hover:text-gray-300">
              Logout
            </button>
          </li>
          <li className="ml-10">
            <Link
              to="/addblog"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Create Blog +
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
