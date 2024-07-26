import { Post } from "../models/post.model.js";
import User from "../models/user.model.js";

const createPost = async (req, res, next) => {
  try {
    const { postedBy, text, img } = req.body;
    if (!postedBy || !text) {
      return res.status(400).json({
        error: "Please fill the postedBy and text field",
      });
    }
    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    const userId = req.user._id;
    if (userId.toString() !== postedBy) {
      return res.status(401).json({
        error: "You are not authorized for making this post",
      });
    }
    // text length validation
    const maxLenght = 500;
    if (text.length > maxLenght) {
      return res.status(400).json({
        error: `Text cannot be more than ${maxLenght} characters!`,
      });
    }
    const newPost = new Post({ postedBy, text, img });
    await newPost.save();
    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {createPost}
