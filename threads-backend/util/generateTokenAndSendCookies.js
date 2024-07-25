import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateTokenAndSendCookies =  (userId,res) => {
   
        // signing
        const token = jwt.sign({userId},process.env.JWT_SECRET,{
            expiresIn : "15d"
        });
        res.cookie("jwt",token,{
            httpOnly : true, // cannot access cookies in browser
            maxAge : 15 * 24 * 60 * 60 * 1000 ,// 15 days
            sameSite : "strict", // prevent DDOS attacks
        })
        return token;
   
}
export {generateTokenAndSendCookies}