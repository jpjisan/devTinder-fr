import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Base";

function Login() {
  const [emailId, setemailId] = useState("neeraj.patel@example.com");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("Neeraj#789");
  const [isLogIn, setisLogIn] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const handleLogIn = async () => {
    // e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      // console.log(res);
      seterror("");

      dispatch(setUser(res?.data));
      navigate("/");
    } catch (error) {
      seterror(error?.response?.data);
      console.log(error);
    }
  };
  const handleSignUp = async () => {
    // e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(setUser(res?.data.savedUser));
      seterror("");

      navigate("/editProfile");
    } catch (error) {
      seterror(error?.response?.data);
      console.log(error);
    }
  };
  return (
    <div className="w-full max-w-sm h-[80vh] overflow-y-auto lg:block flex items-center justify-center  p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="space-y-5   ">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          {isLogIn ? "Log in to devTinder" : "Sign Up to devTinder"}
        </h5>

        {!isLogIn && (
          <>
            <div>
              <label
                // for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={(e) => setfirstName(e.target.value)}
                className="bg-gray-50 capitalize border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ex: Jp"
                required
              />
            </div>
            <div>
              <label
                // for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="bg-gray-50 capitalize border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Ex: Jisan"
                required
              />
            </div>
          </>
        )}
        <div>
          <label
            for="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>

        <div>
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <p className="text-red-400">{error}</p>
        {isLogIn && (
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                for="remember"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Remember me
              </label>
            </div>
            {
              <Link
                to="#"
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Lost Password?
              </Link>
            }
          </div>
        )}
        <button
          type="submit"
          onClick={isLogIn ? handleLogIn : handleSignUp}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {isLogIn ? "Login to your account" : "Sign Up Your Account"}
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          {isLogIn ? "Not registered? " : "Already Registered? "}
          <a
            onClick={() => setisLogIn((value) => !value)}
            href="#"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            {isLogIn ? "Create account" : "Log in Please"}
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
