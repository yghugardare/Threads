import { Post } from "../models/post.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const sendMessage = async (req, res) => {
  try {
    const { recipientId, message } = req.body;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      // get conversation which has participants array which contains
      //  senderId AND recipientId
      participants: { $all: [senderId, recipientId] },
    });
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, recipientId],
        lastMessage: {
          text: message,
          sender: senderId,
        },
      });
      await conversation.save();
    }
    const newMessage = new Message({
      conversationId: conversation._id,
      sender: senderId,
      text: message,
    });
    await Promise.all([
      newMessage.save(),
      conversation.updateOne({
        lastMessage: {
          text: message,
          sender: senderId,
        },
      }),
    ]);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getMessage = async (req, res) => {
  const { otherUserId } = req.params;
  const userId = req.user._id;
  try {
    let conversation = await Conversation.findOne({
      // get conversation which has participants array which contains
      //  userId AND otherUserId
      participants: { $all: [userId, otherUserId] },
    });
    if (!conversation) {
      return res.status(404).json({ error: "Conversation Not Found!" });
    }
    const messages = await Message.find({
      conversationId: conversation._id,
    }).sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getConversations = async (req, res) => {
  const userId = req.user._id;
  try {
    const conversations = await Conversation.find({
      // get conversations where participants array contains only the user id
      participants: userId,
    }).populate({
      path: "participants", // refering to user model
      select: "username profilePic", // geting this fields from user model
    });
    // remove the current user from the partcipants array
    conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
    res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
export { sendMessage, getMessage, getConversations };
