/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { io } from "socket.io-client";
const SocketContext = createContext();

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    // handling connection to api
    // http://localhost:8000/:userId
    const socket = io("http://localhost:8000", {
      query: {
        userId: user?._id,
      },
    });
    setSocket(socket);
    // listen for getOnlineUsers event
    socket.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });
    // handling disconnection
    // if socket is not null
    return () => socket && socket.close();
  }, [user?._id]);
  console.log(onlineUsers, " are online");

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
      {/* <div></div> */}
    </SocketContext.Provider>
  );
};

