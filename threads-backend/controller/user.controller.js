import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateTokenAndSendCookies } from "../util/generateTokenAndSendCookies.js";
const signUpUser = async (req,res,next) => {
    try {
        const {name,email,username, password} = req.body;
        const user =  await User.findOne({$or : [{email},{username}]})
        if(user){
            return res.status(400).json({error:"User already exists!"})
        }
        if(password.length < 6){
            return res.status(400).json({error : "Password length must be greater than 6"})
        }
        const hashPassword = await bcrypt.hash(password,10)
        // add the user
        const newUser = await User.create({
            name,
            username,
            email:email,
            password : hashPassword
        })
        if(newUser){
            generateTokenAndSendCookies(newUser._id,res)
            res.status(201).json({
                _id: newUser._id,
				name: newUser.name,
				email: newUser.email,
				username: newUser.username,
				bio: newUser?.bio,
				profilePic: newUser?.profilePic,
            })
        }else{
            res.status(400).json({ error: "Invalid user data" });
        }
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

const loginUser = async (req,res,next) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username})
        // compare password
        const isPasswordCorrect = await bcrypt.compare(password,user?.password || "")
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"})
        }
        generateTokenAndSendCookies(user._id,res)
        res.status(201).json({
            _id: user._id,
			name: user.name,
			email: user.email,
			username: user.username,
			bio: user.bio,
			profilePic: user.profilePic,
        })
    } catch (err) {
        res.status(500).json({
            error : err.message
        })
    }
}

export {
    signUpUser,
    loginUser
}