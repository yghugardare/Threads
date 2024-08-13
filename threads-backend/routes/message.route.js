import express from "express";
import { protectRoute } from "../middlewares/protectedRoute.js";
import {
  getConversations,
  getMessage,
  sendMessage,
} from "../controller/message.controller.js";
const messageRouter = express.Router();

// get all conversations
messageRouter.get("/conversations", protectRoute, getConversations);
messageRouter.get("/:otherUserId", protectRoute, getMessage);
// get messages of the other person [whom i am chatting with] between him and me
messageRouter.post("/", protectRoute, sendMessage);
export { messageRouter };
