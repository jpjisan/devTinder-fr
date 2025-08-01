import React, { useEffect } from "react";
import { Heart, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Base";
import { removeUserFromFeed, setFeed } from "../utils/feedSlice";
import Loader from "./Loader";
function Feed() {
  const users = useSelector((store) => store.feed);
  // console.log(users);
  const id = users?.[0]?._id;
  console.log(id);

  const dispatch = useDispatch();
  const fetchFeed = async () => {
    try {
      // if (users) return;
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      // console.log("fetch", res);

      dispatch(setFeed(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const requestHandler = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + `/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(id));
      fetchFeed();
    } catch (error) {}
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (users.length <= 0) {
    return <h1>No more Users left</h1>;
  }
  return !users ? (
    <Loader />
  ) : (
    <div className=" h-full  md:w-[] flex items-center justify-center p-4 relative">
      {/* Card Stack Container */}
      <div className="relative h-[70%] w-full md:w-[70%] md:h-[80%] max-w-sm">
        {/* Background Card */}
        <div className="absolute inset-0 h-full bg-white rounded-3xl shadow-lg transform scale-95 opacity-50">
          <img
            src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="classNameic Denim Jacket"
            className="w-full h-full object-cover rounded-t-3xl"
          />
        </div>

        {/* Main Card */}
        <div className="relative h-full  bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Product Image */}
          <div className="relative h-full w-full">
            <img
              src={users[0]?.profilePicture}
              alt="user photo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-xl capitalize font-bold mb-1">
                  {users[0]?.firstName + " " + users[0]?.lastName}
                </h2>
                <p className="text-white/80 capitalize text-sm font-medium">
                  {users[0]?.gender}
                </p>
                <p className="text-white/80 text-sm font-light ">
                  {users[0]?.about?.slice(0, 50) + " . . ."}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{users[0]?.age}</p>
              </div>
            </div>

            {/* Color Options */}
            <div className="flex items-center space-x-2 mt-3">
              <div
                className="w-5 h-5 rounded-full border-2 border-white/60 shadow-sm"
                style={{ backgroundColor: "#D2691E" }}
              />
              <div
                className="w-5 h-5 rounded-full border-2 border-white/60 shadow-sm"
                style={{ backgroundColor: "#8B4513" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
        <button
          onClick={() => requestHandler("ignored", id)}
          className="w-18 h-18 lg:w-14 lg:h-14 bg-white hover:scale-110 rounded-full shadow-lg flex items-center justify-center border border-gray-100"
        >
          <X className="w-6 h-6 hover:scale-130 text-red-500" />
        </button>
        <button
          onClick={() => requestHandler("interested", id)}
          className="w-20 h-20 lg:w-16 lg:h-16 bg-gradient-to-r hover: hover:scale-110  from-pink-500 to-red-500 rounded-full shadow-lg flex   items-center justify-center"
        >
          <Heart className="w-8 h-8 hover:scale-125 text-white fill-current" />
        </button>
      </div>
    </div>
  );
}

export default Feed;
