import { io } from "socket.io-client";
import { BASE_URL } from "../Base";
export const createSocketConnetion = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("https://devtinder-1-k1l7.onrender.com", { path: "/socket.io" });
  }
};
