import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const dbUri = process.env.MONGO_DB_URI
console.log(dbUri)
async function connectDb(){
    try {
        const connectionInstance = await mongoose.connect(dbUri)
        console.log("Mongo Db connected sucessfully at host : "+connectionInstance.connection.host)
    } catch (error) {
        console.log("Mongo DB connection FAILED!!")
        process.exit(1)
    }
}
export {connectDb}