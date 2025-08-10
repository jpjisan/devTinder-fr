import { io } from "socket.io-client";
import { BASE_URL } from "../Base";
export const createSocketConnetion = () => {
  return io(BASE_URL);
};
