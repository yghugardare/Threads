import express from  "express"
import { loginUser, logoutUser, signUpUser } from "../controller/user.controller.js"

const userRoute = express.Router()

userRoute.post("/signup",signUpUser)
userRoute.post("/login",loginUser)
userRoute.post("/logout",logoutUser)

export {
    userRoute
}