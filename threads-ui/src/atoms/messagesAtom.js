import { atom } from "recoil";
export const conversationsAtom = atom({
  key: "conversationAtom",
  default: [],
});

// select conversation and display its contents on the message container

export const selectedConversations = atom({
  key: "selectedConversationAtom",
  default: {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
  },
});
