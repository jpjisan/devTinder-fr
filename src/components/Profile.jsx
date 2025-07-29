import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Heart, X, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

function Profile() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [about, setabout] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [error, seterror] = useState("");
  const user = useSelector((store) => store.user);
  console.log(user);

  return (
    <>
      <div className=" h-full flex items-center justify-center p-4 relative">
        {/* Card Stack Container */}
        <div className="relative w-full max-w-sm">
          {/* Background Card */}
          <div className="absolute inset-0 bg-white rounded-3xl shadow-lg transform scale-95 opacity-50">
            <img
              src="https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="classNameic Denim Jacket"
              className="w-full h-96 object-cover rounded-t-3xl"
            />
          </div>

          {/* Main Card */}
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Product Image */}
            <div className="relative w-[50vh]">
              <img
                src={user?.profilePicture}
                alt="user photo"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Product Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
              <div className="flex items-end justify-between">
                <div>
                  <div
                    className="flex gap-3
                  "
                  >
                    <h2 className="text-xl font-bold mb-1">
                      {user?.firstName + " " + user?.lastName}
                    </h2>
                    <Link to="/editProfile">
                      <PenLine />
                    </Link>
                  </div>
                  <p className="text-white/80 text-sm font-medium">
                    {user?.gender}
                  </p>
                  <p className="text-white/80 text-sm font-light ">
                    {user?.about}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{user?.age}</p>
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
          <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
            <X className="w-6 h-6 text-red-500" />
          </button>

          <button className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center">
            <Heart className="w-7 h-7 text-white fill-current" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Profile;
