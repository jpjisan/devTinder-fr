import React from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../Base";

function Login() {
  const [emailId, setemailId] = useState("ayesha.sheikh@example.com");
  const [password, setpassword] = useState("Ayesha@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const handleLogIn = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);

      dispatch(setUser(res.data));
      navigate("/");
    } catch (error) {
      seterror(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="card bg-base-300 w-80  shadow-sm">
      <figure className="px-10 pt-10 flex flex-col items-center gap-1">
        <h2 className="text-2xl font-bold text-zinc-400">Log In</h2>
        <label className="input validator mt-5  ">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={emailId}
            onChange={(e) => setemailId(e.target.value)}
            required
            className="outline-none focus:outline-none focus:ring-0"
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        <label className="input validator  outline-none mt-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            required
            placeholder="Enter Your Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            className="flex-1 bg-transparent outline-none focus:outline-none focus:ring-0 focus:!border-transparent"
          />
        </label>
        <p className="validator-hint hidden">
          Must be more than 8 characters, including
          <br />
          At least one number <br />
          At least one lowercase letter <br />
          At least one uppercase letter
        </p>
      </figure>
      <div className="card-body items-center text-center">
        <p className="text-[#F0637D] text-xs">{error}</p>
        <div className="card-actions mb-5">
          <button onClick={handleLogIn} className="btn btn-primary ">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
