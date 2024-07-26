import express from "express";
import { createPost, getPost } from "../controller/post.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";
const postRoute = express.Router();

postRoute.post("/create", protectRoute, createPost);
postRoute.get("/:id",getPost)


export {postRoute}