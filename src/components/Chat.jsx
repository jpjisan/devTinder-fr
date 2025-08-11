import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import {
  Send,
  User,
  Phone,
  Video,
  MoreVertical,
  Wifi,
  WifiOff,
  ChevronLeft,
} from "lucide-react";
import { createSocketConnetion } from "../utils/socket";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setConnection } from "../utils/connectionSlice";
import axios from "axios";
import { BASE_URL } from "../Base";
import Loading from "./Loading";

export default function ChatComponent() {
  const navigate = useNavigate();
  // Redux setup
  const dispatch = useDispatch();
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  // FIX 1: Use Redux selector properly - get connections directly from store
  const allConnections = useSelector((store) => store.connection || []);
  const userId = user?._id;

  // console.log("targetUserId:", targetUserId);
  // console.log("userId:", userId);
  // console.log("allConnections from Redux:", allConnections);

  // Socket.IO state
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isRecipientOnline, setIsRecipientOnline] = useState(false);
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const [lastSeen, setLastSeen] = useState(new Date());
  const [targetUser, setTargetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // FIX 2: Add loading state
  const fetchMessages = async () => {
    const res = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log("fecthmessages", res);
    // console.log();

    // console.log("check", res?.data?.targetUser);

    setTargetUser(res?.data?.targetUser);
    setMessages(res?.data?.chat?.messages);
    setIsLoading(false);
  };
  // console.log("messages", messages);

  // console.log(targetUser);

  // Chat state

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      const messagesContainer =
        messagesEndRef.current.closest(".overflow-y-auto");
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Socket.IO setup
  useEffect(() => {
    if (!userId) return;

    const socket = createSocketConnetion();
    socketRef.current = socket;

    socket.on("user-typing", ({ userId: typingUserId }) => {
      if (typingUserId === targetUserId) setIsRecipientTyping(true);
    });
    socket.on("user-stopped-typing", ({ userId: stoppedTypingUserId }) => {
      if (stoppedTypingUserId === targetUserId) setIsRecipientTyping(false);
    });
    socket.on("user-online", ({ userId: onlineUserId }) => {
      if (onlineUserId === targetUserId) setIsRecipientOnline(true);
    });
    socket.on(
      "user-offline",
      ({ userId: offlineUserId, lastSeen: userLastSeen }) => {
        if (offlineUserId === targetUserId) {
          setIsRecipientOnline(false);
          setLastSeen(new Date(userLastSeen));
        }
      }
    );
    socket.on("message-read", ({ messageId }) => {
      updateMessageStatus(messageId, "read");
    });

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on("messageRecived", ({ firstName, lastmsg }) => {
      console.log(firstName, lastmsg);
      handleNewMessage(lastmsg);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetUserId, user?.firstName]);
  // FIX 7: Include targetUser in dependencies

  // Handle new message from socket
  const handleNewMessage = (messageData) => {
    setMessages((prev) => [...prev, messageData]);
  };

  // Update message status
  const updateMessageStatus = (messageId, status) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, status } : msg))
    );
  };

  // Send message via Socket.IO
  const handleSendMessage = () => {
    if (inputValue.trim() === "" || !isConnected) return;

    const newMessage = {
      text: inputValue,
      status: "sent",
    };

    setInputValue("");
    handleStopTyping();

    socketRef.current?.emit("sendMassge", {
      firstName: user?.firstName,
      userId,
      targetUserId,
      message: newMessage,
    });
  };

  // Handle typing indicator
  const handleInputChange = (e) => {
    setInputValue(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socketRef.current?.emit("user-typing", { targetUserId });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  const handleStopTyping = () => {
    if (isTyping) {
      setIsTyping(false);
      socketRef.current?.emit("user-stopped-typing", { targetUserId });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    const d = new Date(date); // convert string/timestamp to Date object
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatLastSeen = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Last seen just now";
    if (diffInMinutes < 60) return `Last seen ${diffInMinutes}m ago`;
    if (diffInMinutes < 1440)
      return `Last seen ${Math.floor(diffInMinutes / 60)}h ago`;
    return `Last seen ${date.toLocaleDateString()}`;
  };

  const getMessageStatus = (status) => {
    switch (status) {
      case "sent":
        return "✓";
      case "delivered":
        return "✓✓";
      case "read":
        return "✓✓";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    return status === "read" ? "text-blue-500" : "text-gray-400";
  };

  // FIX 9: Improved loading state handling
  if (isLoading) {
    return <Loading text="Loading Chats" />;
  }

  // FIX 10: Better error handling
  if (!targetUserId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-600">
          <p>No target user specified</p>
        </div>
      </div>
    );
  }

  if (!targetUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-red-600">
          <p>User not found for ID: {targetUserId}</p>
          <p className="text-sm text-gray-500 mt-2">
            Available connections: {allConnections.length}
          </p>
        </div>
      </div>
    );
  }

  return (
    messages && (
      <div className="flex flex-col h-full lg:w-1/3 w-md mx-auto bg-white border border-gray-200 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between py-5 pr-2 border-b  border-gray-200 bg-gray-50 rounded-t-lg">
          <div className="flex items-center space-x-2">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className=" px-1 py-2"
            >
              <ChevronLeft size={30} color="#000000" />
            </div>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <img
                  className="overflow-hidden rounded-full w-full h-full object-cover"
                  src={targetUser?.profilePicture}
                  alt=""
                />
              </div>
              {isRecipientOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">
                {targetUser?.firstName || "Unknown User"} {targetUser?.lastName}
              </h3>
              <div className="flex items-center space-x-1 text-sm">
                {!isConnected ? (
                  <div className="flex items-center space-x-1 text-red-500">
                    <WifiOff className="w-3 h-3" />
                    <span>Disconnected</span>
                  </div>
                ) : isRecipientTyping ? (
                  <span className="text-blue-500">typing...</span>
                ) : isRecipientOnline ? (
                  <span className="text-green-500">online</span>
                ) : (
                  <span className="text-gray-500">
                    {formatLastSeen(lastSeen)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${
                message.senderId === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md ${
                  message.senderId === user?._id ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    message.senderId === user?._id
                      ? "bg-blue-500 text-white rounded-br-md"
                      : "bg-gray-100 text-gray-800 rounded-bl-md"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
                <div className="flex items-center justify-between mt-1 px-2">
                  <p className="text-xs text-gray-500">
                    {formatTime(message.createdAt)}
                  </p>
                  {message.senderId === user?._id && (
                    <span
                      className={`text-xs ml-2 ${getStatusColor(
                        message.status
                      )}`}
                    >
                      {getMessageStatus(message.status)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isRecipientTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          {!isConnected && (
            <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm text-center">
              Connection lost. Trying to reconnect...
            </div>
          )}

          <div className="flex space-x-2">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder={isConnected ? "Type a message..." : "Connecting..."}
              disabled={!isConnected}
              className={`flex-1 resize-none text-black border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 transition-colors ${
                isConnected
                  ? "border-gray-300 focus:ring-blue-500 focus:border-transparent"
                  : "border-gray-200 bg-gray-50 text-gray-400"
              }`}
              rows="1"
              style={{ minHeight: "40px", maxHeight: "120px" }}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || !isConnected}
              className={`px-4 py-2 rounded-lg flex items-center justify-center transition-colors ${
                inputValue.trim() === "" || !isConnected
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
