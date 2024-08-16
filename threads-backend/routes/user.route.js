import express from "express";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  signUpUser,
  updateUser,
  freezeAccount,
} from "../controller/user.controller.js";
import { protectRoute } from "../middlewares/protectedRoute.js";

const userRoute = express.Router();

userRoute.get("/profile/:query", getUserProfile);
userRoute.post("/follow/:id", protectRoute, followUnfollowUser);
userRoute.put("/update/:id", protectRoute, updateUser);
userRoute.get("/suggested", protectRoute, getSuggestedUsers);
userRoute.post("/signup", signUpUser);
userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);
userRoute.put("/freeze", protectRoute, freezeAccount);

export { userRoute };
