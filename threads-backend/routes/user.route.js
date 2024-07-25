import express from  "express"
import { loginUser, signUpUser } from "../controller/user.controller.js"

const userRoute = express.Router()

userRoute.post("/signup",signUpUser)
userRoute.post("/login",loginUser)

export {
    userRoute
}