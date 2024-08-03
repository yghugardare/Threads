import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  likeUnlikePost,
  replyToPost,
} from "../controller/post.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";
const postRoute = express.Router();
postRoute.get("/feed", protectRoute, getFeedPosts);
postRoute.post("/create", protectRoute, createPost);
postRoute.get("/:id", getPost);
postRoute.delete("/:id", protectRoute, deletePost);
postRoute.put("/like/:id", protectRoute, likeUnlikePost);
postRoute.put("/reply/:id", protectRoute, replyToPost);

export { postRoute };
