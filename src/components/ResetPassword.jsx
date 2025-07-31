import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Base";

function ResetPassword() {
  const [password, setpassword] = useState("Neeraj#789");
  const [newPassword, setNewPassword] = useState("Neeraj#789");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toast, settoast] = useState(false);

  const [error, seterror] = useState("");
  const handleResetPassword = async () => {
    // e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/change-password",
        {
          password: password,
          newPassword: newPassword,
        },
        { withCredentials: true }
      );
      // console.log(res);
      seterror("");
      settoast(true);
      setTimeout(() => {
        settoast(false);
        navigate("/profile");
      }, 2000);

      //   dispatch(setUser(res?.data));
    } catch (error) {
      seterror(error?.response?.data);
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-sm h-[65vh] overflow-y-auto  p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      {toast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success">
            <span>Password Reset successfully.</span>
          </div>
        </div>
      )}
      <div className="space-y-6   ">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Password Change
        </h5>

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
        <div>
          <label
            for="newPassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your New password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <p className="text-red-400">{error}</p>

        <button
          type="submit"
          //   onClick={isLogIn ? handleLogIn : handleSignUp}
          onClick={handleResetPassword}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Change The Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
