import express from "express";
import {
  followUnfollowUser,
  getUserProfile,
  loginUser,
  logoutUser,
  signUpUser,
  updateUser,
} from "../controller/user.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";

const userRoute = express.Router();

userRoute.get("/profile/:query", getUserProfile);

userRoute.post("/signup", signUpUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);
userRoute.post("/follow/:id", protectRoute, followUnfollowUser);
userRoute.put("/update/:id", protectRoute, updateUser);

export { userRoute };
