import express from "express";
import {
  createPost,
  deletePost,
  getPost,
} from "../controller/post.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";
const postRoute = express.Router();

postRoute.post("/create", protectRoute, createPost);
postRoute.get("/:id", getPost);
postRoute.delete("/:id", protectRoute, deletePost);

export { postRoute };
