import express from "express";
import { protectRoute } from "../middlewares/protectedRoute.js";
import { getMessage, sendMessage } from "../controller/message.controller.js";
const messageRouter = express.Router();

messageRouter.post("/", protectRoute, sendMessage);
// get messages of the other person [whom i am chatting with] between him and me
messageRouter.get("/:otherUserId", protectRoute, getMessage);

export { messageRouter };
