import express from "express"
import dotenv from  "dotenv"
import { connectDb } from "./db/connectDb.js"
dotenv.config()
connectDb()
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is Running at http://localhost:${PORT}`);
})