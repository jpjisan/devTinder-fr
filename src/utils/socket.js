import { io } from "socket.io-client";
import { BASE_URL } from "../Base";
export const createSocketConnetion = () => {
  if (location.hostname === "localhost") {
    return io(BASE_URL);
  } else {
    return io("https://devpalace.netlify.app", { path: "/socket.oi" });
  }
};
