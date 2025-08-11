import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Base";
import { removeUser } from "../utils/userSlice";
import { House, MessageSquareMore } from "lucide-react";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      setOpen(false);
      // Clear any local storage if used
      localStorage.clear();
      sessionStorage.clear();
      return navigate("/login");
    } catch (error) {
      // Even if logout fails, clear user state
      dispatch(removeUser());
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="navbar bg-base-300  shadow-sm">
      <div className="flex-1 ">
        <Link to="/" className="btn btn-ghost  ">
          <img
            className=" scale-125 md:scale-110 w-40"
            src="/logo.png"
            alt=""
          />
        </Link>
      </div>
      {user && (
        <div className="flex md:gap-10 md:mx-6 justify-between  items-center">
          <div className=" flex md:gap-6 mx-5  items-center">
            <NavLink
              className={({ isActive }) =>
                `hidden md:block p-2 rounded ${
                  isActive
                    ? " text-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
              to={"/"}
            >
              <House size={32} />
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `p-2 rounded ${
                  isActive
                    ? " text-blue-500"
                    : "text-gray-400 hover:text-gray-200"
                }`
              }
              to={"/chat"}
            >
              <MessageSquareMore size={34} />
            </NavLink>
          </div>
          <div className="dropdown dropdown-end gap-2 flex">
            <div className="flex items-center justify-center">
              <p className="font-semibold capitalize">
                Hello, {user.firstName}
              </p>
            </div>

            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setOpen((v) => !v)}
            >
              <div className="w-10  rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profilePicture}
                />
              </div>
            </div>
            {open && (
              <ul
                tabIndex={0}
                className="menu md:menu-md menu-lg  dropdown-content bg-base-100 rounded-box z-1 mt-3 w-55 p-4 shadow"
              >
                <li>
                  <Link
                    to="/"
                    className="justify-between"
                    onClick={() => setOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="justify-between"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="justify-between"
                    onClick={() => setOpen(false)}
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="justify-between"
                    onClick={() => setOpen(false)}
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reset-password"
                    className="justify-between"
                    onClick={() => setOpen(false)}
                  >
                    Change Password
                  </Link>
                </li>
                <li>
                  <a onClick={() => setOpen(false)}>Settings</a>
                </li>
                <li>
                  <a onClick={handleLogOut}> Logout</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
