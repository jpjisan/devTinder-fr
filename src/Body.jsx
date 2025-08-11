import React, { useEffect } from "react";
import NavBar from "./components/NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "./Base";
import { setUser } from "./utils/userSlice";

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  // console.log("user from body ", user);
  const getUser = async () => {
    try {
      if (!user) {
        const res = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(setUser(res.data));
      }
    } catch (error) {
      if (error.status === 401) {
        return navigate("/login");
      }
      console.log("errror:", error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <NavBar />
      <div className="h-[90vh] flex items-center justify-center overflow-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Body;
