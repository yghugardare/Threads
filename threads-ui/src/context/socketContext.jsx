/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { io } from "socket.io-client";
const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const user = useRecoilValue(userAtom);
    useEffect(()=>{
        // handling connection to api
        // http://localhost:8000/:userId
        const socket = io("http://localhost:8000",{
            query : {
                userId : user?._id
            }
    })
    setSocket(socket)
    // handling disconnection
    // if socket is not null
    return ()=>  socket && socket.close()
    },[user?._id])

  return (
    <SocketContext.Provider value={{socket}}>
      {children}
      {/* <div></div> */}
    </SocketContext.Provider>
  );
};
// to access the value of the socket
// we use useSocket
export const useSocket = () => {
  return useContext(SocketContext);
}