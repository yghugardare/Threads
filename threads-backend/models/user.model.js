import mongoose from "mongoose"
const userSchema = new mongoose.Schema({
    name : {
        type :String,
        required : [true,"Name of the user is required"]
    },
    username : {
        type :String,
        required : [true,"Username of the user is required"],
        unique : true
    },
    email : {
        type :String,
        required : [true,"email of the user is required"],
        unique : true
    },
    password : {
        type :String,
        required : [true,"Password of the user is required"],
        unique : true,
        minLength : 6
    },
    followers : {
        type : [String],
        default : []
    },
    following : {
        type : [String],
        default : []
    },
    profilePic : {
        type : String,
        default : ""
    },
    bio : {
        type: String,
        default : ""
    },
    isFrozen : {
        type : Boolean,
        default : false
    }

}, {timestamps : true})
const User = mongoose.model("User",userSchema)
export default User
// User -> users