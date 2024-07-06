import Cookies from "js-cookie";
const verifyToken = async () => {
  const token = Cookies.get("token");
  if (!token) {
    return false;
  }
  try {
    const res = await fetch("/api/v1/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (data.token) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error verifying token:", error);
    return false;
  }
};

export default verifyToken;
//this function is called to verify token in the backend and if token is verified from backed properly the it return the response then this function return true/false as per verification
