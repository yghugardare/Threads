import express from "express"
import { protectRoute } from "../middlewares/protectedRoute.js";
import { sendMessage } from "../controller/message.controller.js";
const messageRouter = express.Router();

messageRouter.post("/",protectRoute,sendMessage)

export {messageRouter}