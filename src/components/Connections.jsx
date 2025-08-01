import axios from "axios";
import React from "react";
import { BASE_URL } from "../Base";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConnection } from "../utils/connectionSlice";
import {
  Users,
  Search,
  MessageCircle,
  MoreHorizontal,
  Dot,
  Star,
} from "lucide-react";

function Connections() {
  const [searchTerm, setSearchTerm] = useState("");

  // const [users, setusers] = useState([]);
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    if (connections.length > 0) {
      return;
    }
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // console.log(res?.data?.user);
      // setusers(res?.data?.user);
      dispatch(setConnection(res?.data?.user));
    } catch (error) {
      console.log("Error", error);
    }
  };
  const filteredConnections =
    connections &&
    connections.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  useEffect(() => {
    // if (connections.length === 0) fetchConnections();
    if (connections.length === 0) fetchConnections();
    // fetchConnections();
  }, []);

  return (
    <div className="h-[95%] lg:w-[30%] w-[95%] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl flex flex-col border border-slate-700/50 backdrop-blur-sm">
      {/* Header with gradient */}
      <div className="p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-t-2xl border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">Connections</h1>
              <p className="text-xs text-slate-400">
                {connections?.length} online now
              </p>
            </div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-600/30">
            <span className="text-sm font-medium text-slate-300">
              {connections.length}
            </span>
          </div>
        </div>

        {/* Enhanced Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search connections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800/60 backdrop-blur-sm border border-slate-600/30 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Connections List */}
      <div className="flex-1 overflow-y-auto px-4 py-2 scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
        {filteredConnections.length > 0 ? (
          <div className="space-y-2">
            {filteredConnections.map((user, idx) => (
              <div
                key={user._id || idx}
                className="group relative bg-slate-800/30 hover:bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 transition-all duration-200 cursor-pointer border border-slate-700/30 hover:border-slate-600/50 hover:shadow-lg hover:shadow-blue-500/10"
              >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-600/50 group-hover:ring-blue-500/30 transition-all duration-200"
                        src={
                          user.profilePicture ||
                          "https://img.daisyui.com/images/profile/demo/1@94.webp"
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                      />
                      {/* {user.isOnline ? (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-800 shadow-lg">
                          <div className="w-full h-full bg-emerald-400 rounded-full animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-slate-500 rounded-full border-2 border-slate-800"></div>
                      )} */}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">
                          {user.firstName} {user.lastName}
                        </h3>
                        {/* {user.isOnline && (
                          <Star className="w-3 h-3 text-emerald-400 fill-current" />
                        )} */}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-400 capitalize">
                          {user.gender}
                        </span>
                        <Dot className="w-3 h-3 text-slate-600" />
                        {/* <span className="text-xs text-slate-500">
                          {user.lastSeen}
                        </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0">
                    <button className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 transition-all duration-200 hover:scale-110">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-600/30 hover:bg-slate-500/50 text-slate-400 hover:text-slate-300 transition-all duration-200 hover:scale-110">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <div className="p-4 bg-slate-800/50 rounded-2xl mb-4">
              <Users className="w-12 h-12 text-slate-500" />
            </div>
            <h3 className="text-lg font-medium text-slate-300 mb-2">
              {searchTerm ? "No matches found" : "No connections yet"}
            </h3>
            <p className="text-sm text-slate-500 text-center max-w-48">
              {searchTerm
                ? "Try adjusting your search terms"
                : "Start connecting with people to see them here"}
            </p>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      {connections.length > 0 && (
        <div className="p-4 bg-slate-800/30 backdrop-blur-sm rounded-b-2xl border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
              <span className="text-xs text-slate-400">
                {filteredConnections.length} of {connections.length} connections
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              {/* <span className="text-xs text-emerald-400 font-medium">
                {onlineCount} online
              </span> */}
            </div>
          </div>
        </div>
      )}
    </div>
    // <div>kkdcskkd</div>
  );
}

export default Connections;
