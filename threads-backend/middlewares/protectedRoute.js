import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
// import dotenv from "dotenv"
// dotenv.config()
const protectRoute = async (req, res, next) => {
  try {
    const jwtToken = req.cookies.jwt;
    if (!jwtToken)
      return res.status(401).json({ message: "Unauthorized Access!" });
    // decoded token
    const jwtPayload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    // Get the current user
    const user = await User.findById(jwtPayload.userId).select("-password");
    // add the user as property inside the request object
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
    console.log("Error in Sign Up user");
  }
};
export { protectRoute };
