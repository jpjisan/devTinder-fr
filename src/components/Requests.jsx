import axios from "axios";
import React from "react";
import { BASE_URL } from "../Base";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRequests } from "../utils/requestSlice";

import { Check, X, User, UserPlus, Clock } from "lucide-react";
import Loading from "./Loading";

function Requests() {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [isLoading, setIsLoading] = useState(true); // FIX 2: Add loading state
  // console.log(requests);

  const fetchRequests = async () => {
    // if (requests.length > 0) {
    //   return;
    // }
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      //   console.log(res?.data);
      // setusers(res?.data?.user);
      dispatch(setRequests(res?.data.data));
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
    }
  };
  const reviewRequestHandler = async (status, id) => {
    try {
      // console.log(id);

      const res = await axios.post(
        BASE_URL + `/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      // console.log(res.data.connectionRequest);
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };
  // const rejectHandler = async (id) => {
  //   try {
  //     console.log(id);

  //     const res = await axios.post(BASE_URL + `/request/review/rejected/${id}`);
  //     console.log(res.data.connectionRequest);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  useEffect(() => {
    // if (requests.length === 0) fetchRequests();
    fetchRequests();
  }, []);
  return (
    // <div className=" h-[95%] w-[25%] p-3 bg-[#1E2939]  rounded-xl shadow-2xl flex flex-col justify-start ">
    //   <div>
    //     <h1 className="font-semibold p-5">Requests Recieved</h1>
    //   </div>
    //   <ul className="list bg-base-100 rounded-box shadow-md overflow-hidden overflow-y-auto ">
    //     {requests?.length > 0 ? (
    //       requests.map((user, idx) => (
    //         <li className="list-row" key={user._id || idx}>
    //           <div className="flex items-center gap-2">
    //             <img
    //               className="size-10 rounded-box"
    //               src={
    //                 user.fromUserId.profilePicture ||
    //                 "https://img.daisyui.com/images/profile/demo/1@94.webp"
    //               }
    //               alt={`${user.fromUserId.firstName} ${user.fromUserId.lastName}`}
    //             />
    //             <div>
    //               <div>
    //                 {user.fromUserId.firstName} {user.fromUserId.lastName}
    //               </div>
    //               <div className="text-xs uppercase font-semibold opacity-60">
    //                 {user.fromUserId.gender}
    //               </div>
    //             </div>
    //           </div>
    //         </li>
    //       ))
    //     ) : (
    //       <h1>No requests</h1>
    //     )}
    //   </ul>
    // </div>
    <div className="max-w-2xl  mx-auto p-6 h-full w-full lg:w-[30%]  ">
      <div className="bg-gray-800 rounded-xl h-full shadow-sm border border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2A5470] to-[#4C4177] flex px-6 py-4">
          <div className="flex items-center space-x-3">
            <UserPlus className="w-6 h-6 text-white" />
            <h1 className="text-xl font-semibold text-white">
              Connection Requests
            </h1>
            {/* {requests?.length > 0 && (
              <span className="bg-white/20 w-[10%]  text-white text-sm px-2 py-1 rounded-2xl">
                {requests.length} pending
              </span>
            )} */}
          </div>
        </div>

        {/* Pending Requests */}
        {isLoading ? (
          <Loading text="Loading Requestes" />
        ) : (
          <div className="p-6">
            <h2 className="text-lg  font-medium text-gray-100 mb-4 flex  items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              Pending Requests{"  "}
              <span className="bg-white/20 w-[20px] h-[20px] text-center ml-1  text-white text-xs  rounded-full">
                {requests.length}
              </span>
            </h2>
            <div className="space-y-4 overflow-y-auto">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={request.fromUserId.profilePicture}
                      alt={request.fromUserId.firstName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-100">
                        {request.fromUserId.firstName}
                      </h3>
                      {/* <p className="text-sm text-gray-300">{request.title}</p> */}
                      {/* <p className="text-xs text-gray-400 mt-1">
                        {request.mutualConnections} mutual connections •{" "}
                        {request.timeAgo}
                      </p> */}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() =>
                        reviewRequestHandler("accepted", request._id)
                      }
                      // onClick={() => acceptHandler(request._id)}
                      className="flex items-center justify-center w-10 h-10 bg-green-100 hover:bg-green-200 text-green-600 hover:text-green-700 rounded-full transition-colors"
                      title="Accept connection"
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <button
                      // onClick={() => rejectHandler(request.id)}
                      onClick={() =>
                        reviewRequestHandler("rejected", request._id)
                      }
                      className="flex items-center justify-center w-10 h-10 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-full transition-colors"
                      title="Reject connection"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        {/* {requests.length > 0 && (
          <div
            className={`p-6 ${
              requests.length > 0 ? "border-t border-gray-600" : ""
            }`}
          >
            <h2 className="text-lg font-medium text-gray-100 mb-4 flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {requests.map((request) => (
                <div
                  key={request._id}
                  className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={request.avatar}
                      alt={request.name}
                      className="w-10 h-10 rounded-full object-cover opacity-75"
                    />
                    <div>
                      <h3 className="font-medium text-gray-200 text-sm">
                        {request.name}
                      </h3>
                      <p className="text-xs text-gray-400">{request.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {request.status === "accepted" ? (
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        Connected
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-400 bg-gray-600 px-2 py-1 rounded-full">
                        Declined
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Empty State */}
        {requests.length === 0 && (
          <div className="p-12 text-center">
            <UserPlus className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-100 mb-2">
              No connection requests
            </h3>
            <p className="text-gray-300">
              You're all caught up! New connection requests will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Requests;
