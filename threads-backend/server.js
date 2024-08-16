import express from "express";
import path from "path";
import dotenv from "dotenv";
import { connectDb } from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/user.route.js";
import { postRoute } from "./routes/post.route.js";
import { v2 as cloudinary } from "cloudinary";
import { messageRouter } from "./routes/message.route.js";
import { app, server } from "./socket/socket.js";
dotenv.config();
connectDb();
// const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// global middlewares
// parses the JSON payload of incoming requests and makes it accessible in req.body.
app.use(express.json({ limit: "50mb" }));
// built-in middleware function in Express.js that parses incoming requests with URL-encoded payloads
// extends:true => Supports nested objects and arrays.
app.use(express.urlencoded({ extended: true }));
// parses cookies attached to the incoming requests and makes them accessible in the req.cookies object.
app.use(cookieParser());

// create routes
app.use("/api/users/", userRoute);
app.use("/api/posts/", postRoute);
app.use("/api/messages", messageRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/threads-ui/dist")));

	// react app
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "threads-ui", "dist", "index.html"));
	});
}

server.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
