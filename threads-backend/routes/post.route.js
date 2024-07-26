import express from "express";
import { createPost } from "../controller/post.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";
const postRoute = express.Router();

postRoute.post("/create", protectRoute, createPost);


export {postRoute}