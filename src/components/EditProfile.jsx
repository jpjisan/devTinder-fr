import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, X } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../Base";
import { setUser } from "../utils/userSlice";

function EditProfile() {
  const user = useSelector((store) => store.user);
  console.log("from edit", user);

  // Update local state when user changes
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [age, setage] = useState("");
  const [gender, setgender] = useState("");
  const [about, setabout] = useState("");
  const [profilePicture, setprofilePicture] = useState("");
  const [error, seterror] = useState("");
  const [toast, settoast] = useState(false);
  const dispatch = useDispatch();
  // const onsSubmitHandler = async () => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(
  //       BASE_URL + "/profile/edit",
  //       {
  //         firstName: firstName,
  //         lastName: lastName,

  //         age: age,
  //         gender: gender,
  //         about: about,
  //         profilePicture: profilePicture,
  //       },
  //       { withCredentials: true }
  //     );
  //     console.log(res);
  //   } catch (error) {
  //     console.log("Error in updating", error);
  //   }
  // };

  useEffect(() => {
    if (user) {
      setfirstName(user.firstName || "");
      setlastName(user.lastName || "");
      setage(user.age || "");
      setgender(user.gender || "");
      setabout(user.about || "");
      setprofilePicture(user.profilePicture || "");
    }
  }, [user]);

  const editProfileHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          profilePicture,
        },
        { withCredentials: true }
      );
      seterror("");
      settoast(true);
      setTimeout(() => {
        settoast(false);
      }, 3000);

      // console.log(res);

      dispatch(setUser(res?.data));
    } catch (error) {
      console.log(error);
      seterror(error.response.data);
    }
  };

  return !user ? (
    <h1>Loading</h1>
  ) : (
    <>
      <div className="flex ">
        {toast && (
          <div className="toast toast-top toast-center z-50">
            <div className="alert alert-success">
              <span>Profile saved successfully.</span>
            </div>
          </div>
        )}
        <form className="h-full max-w-md py-10" onSubmit={editProfileHandler}>
          <div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="number"
                name="floating_age"
                id="floating_age"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={age}
                onChange={(e) => setage(e.target.value)}
              />
              <label
                htmlFor="floating_age"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Age
              </label>
            </div>
            <div>
              <label
                htmlFor="countries"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Gender
              </label>
              <select
                id="countries"
                value={gender}
                onChange={(e) => setgender(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select</option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="others">others</option>
              </select>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              name="floating_about"
              id="floating_about"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={about}
              onChange={(e) => setabout(e.target.value)}
            />
            <label
              htmlFor="floating_about"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              About
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              name="floating_ProfilePicture"
              id="floating_ProfilePicture"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={profilePicture}
              onChange={(e) => setprofilePicture(e.target.value)}
            />
            <label
              htmlFor="floating_ProfilePicture"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              ProfilePicture
            </label>
          </div>
          <p className="text-red-400 mb-3"> {error}</p>
          <button
            // onClick={onsSubmitHandler}
            onSubmit={editProfileHandler}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

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
                  src={profilePicture}
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
                        {firstName + " " + lastName}
                      </h2>
                    </div>
                    <p className="text-white/80 capitalize text-sm font-medium">
                      {gender}
                    </p>
                    <p className="text-white/80 text-sm font-light ">{about}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold">{age}</p>
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
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
            <button className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-100">
              <X className="w-6 h-6 text-red-500" />
            </button>

            <button className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-white fill-current" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
