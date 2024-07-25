import express from "express";
import {
  followUnfollowUser,
  loginUser,
  logoutUser,
  signUpUser,
} from "../controller/user.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";

const userRoute = express.Router();

userRoute.post("/signup", signUpUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);
userRoute.post("/follow/:id", protectRoute, followUnfollowUser);

export { userRoute };
