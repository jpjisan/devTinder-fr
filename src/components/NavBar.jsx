import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Base";
import { removeUser } from "../utils/userSlice";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log("user in NavBar", user);
  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="navbar bg-base-300  shadow-sm">
      <div className="flex-1 ">
        <Link to="/" className="btn btn-ghost bg-zinc-700  text-xl">
          devMeet
        </Link>
      </div>
      {user && (
        <div className="flex gap-2 mx-5 items-center">
          <div className="dropdown dropdown-end gap-2 flex">
            <div className="flex items-center justify-center">
              <p className="font-semibold capitalize">
                Welcome, {user.firstName}
              </p>
            </div>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10  rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePicture}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/connections" className="justify-between">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="justify-between">
                  Requests
                </Link>
              </li>
              <li>
                <Link to="/reset-password" className="justify-between">
                  Change Password
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={handleLogOut}> Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
