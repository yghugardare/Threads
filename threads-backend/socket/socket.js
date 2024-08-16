import { Server } from "socket.io";
import http from "http";
import express from "express";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
// to send message to a particular user we need to give
// recipients[that user's] socket id
export const getRecipientSocketId = (recipientId) => {
  return userSocketMap[recipientId];
};
const userSocketMap = {}; // userId : socketId
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  // fetching the user id from client
  const userId = socket.handshake.query.userId;
  // we use hashmap to store the user id
  if (userId != "undefined") userSocketMap[userId] = socket.id;
  // for an event "getOnlineUsers" send array of keys of the userSocketMap object
  // to all the users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("markMessageAsSeen", async ({ conversationId, userId }) => {
    try {
      // update seen of that user how saw the message
      await Message.updateMany(
        { conversationId: conversationId, seen: false },
        { $set: { seen: true } }
      );
      // update the seen status of the last message in Coversation
      await Conversation.updateOne({ _id: conversationId }, { $set: { "lastMessage.seen": true } });
      // send seen message to the user
      // to indicate to him that the other person whom he sent msg has seen it
      io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId });
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    // remove the user id from the map
    delete userSocketMap[userId];
    // emit the same getOnlineUsers event
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});
export { io, server, app };
