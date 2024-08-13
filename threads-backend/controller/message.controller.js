import { Post } from "../models/post.model.js";
import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

const sendMessage = async (req,res) => {
    try {
        const {recipientId,message} = req.body;
        const senderId =req.user._id;
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId,recipientId]},
        })
        if(!conversation){
            conversation = new Conversation({
                participants : [senderId,recipientId],
                lastMessage : {
                    text : message,
                    sender : senderId,
                },

            })
            await conversation.save();
        }
        const newMessage = new Message({
            conversationId : conversation._id,
            sender : senderId,
            text : message
        });
        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage : {
                    text : message,
                    sender : senderId
                }
            })
        ])
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}
export {
    sendMessage
}