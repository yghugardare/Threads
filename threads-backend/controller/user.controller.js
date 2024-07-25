import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSendCookies } from "../util/generateTokenAndSendCookies.js";
const signUpUser = async (req, res, next) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({ error: "User already exists!" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password length must be greater than 6" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    // add the user
    const newUser = await User.create({
      name,
      username,
      email: email,
      password: hashPassword,
    });
    if (newUser) {
      generateTokenAndSendCookies(newUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser?.bio,
        profilePic: newUser?.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    // compare password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSendCookies(user._id, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      profilePic: user.profilePic,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
const logoutUser = async (req, res) => {
  try {
    // just clear the token stored inside cookies
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(201).json({ message: "User loged out succesfully!" });
  } catch (err) {
    res.status(500).json({ error: `Error in logout: ${err.message}` });
  }
};
const followUnfollowUser = async (req, res, next) => {
  try {
    // get the person to whom you want to follow/unfollow
    const { id } = req.params;
    const personToFollowUnfollow = await User.findById(id);
    const currUser = req.user;
    // console.log(currUser)
    // check if a user does not follow his own account
    let cId= String(currUser._id)
    if(cId === id) return res.status(400).json({
        message : "You cannot follow/unfollow yourself"
    })
    if(!personToFollowUnfollow || !currUser) return res.status(400).json({
        message : "User not found!"
    })
    // toggle logic
    // i can unfolow if am already following the user
    // i can follow someone if i am not following him
    // check if currUser is already following that person
    const isFollowing = currUser.following.includes(id);
    if(isFollowing){
        // unfollow him
        await User.findByIdAndUpdate(id,{$pull : {followers : cId}})
        // remove him from followers list of currUser
        await User.findByIdAndUpdate(currUser._id,{$pull : {following : id}})
        return res.status(201).json({ message: "User unfollowed successfully!" });
    }else{
        
        // add him into followers list of currUser
        await User.findByIdAndUpdate(id,{$push : {followers :cId}})
        // follow him
        await User.findByIdAndUpdate(currUser._id,{$push : {following : id}})
        return res.status(201).json({ message: "User followed successfully!" });
    }
    
  } catch (err) {
    res.status(500).json({ error: `Error in Follow/Unfollow: ${err.message}` });
  }
};
export { signUpUser, loginUser, logoutUser, followUnfollowUser };
