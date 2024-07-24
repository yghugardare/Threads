import express from "express"
import dotenv from  "dotenv"
import { connectDb } from "./db/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
connectDb()
const app = express()

// global middlewares
// parses the JSON payload of incoming requests and makes it accessible in req.body. 
app.use(express.json())
// built-in middleware function in Express.js that parses incoming requests with URL-encoded payloads 
// extends:true => Supports nested objects and arrays.
app.use(express.urlencoded({extended:true}))
// parses cookies attached to the incoming requests and makes them accessible in the req.cookies object.
app.use(cookieParser())


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`);
})