# 🧵 Threads Application Clone

Welcome to the **Threads Application Clone**, a feature-rich social media platform designed to mimic the popular Threads app. Built with a modern tech stack, this application offers a seamless and engaging user experience, complete with real-time chat, image-supported posts, and advanced user interactions.

## 🌟 Features

- **Authentication**: Users can securely sign up, log in, and log out, with full session management.
- **Responsive UI**: Styled using Chakra UI, offering both dark and light modes for an optimal viewing experience.
- **User Interactions**:
  - **Search and Follower Suggestions**: Easily find other users and get suggestions based on your network.
  - **Account Freezing**: Temporarily hide your profile from others by freezing your account, and unfreeze it by logging in again.
  - **Posts Management**: Create, like, comment, delete, and repost posts with support for image uploads.
  - **Follow System**: Follow and unfollow users to tailor your feed based on your interests.
- **Real-Time Chat**: Engage in real-time conversations with text and image support. Message status indicators show whether messages have been seen (blue tick) or not (white tick).
- **Notification Alerts**: Receive sound notifications for new messages to stay updated instantly.

## 🛠  Tech Stack

- 💫**Frontend**: React, Recoil for state management
- 🗄️**Backend**: Node.js, Express.js, Mongoose, MongoDB
- 🎨**Styling**: Chakra UI
- 🗨️**Real-Time Communication**: Socket.io

## 🚀 Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/your-username/threads-app-clone.git
    cd threads-app-clone
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add your environment variables.

    ```plaintext
    MONGODB_URI=your-mongodb-uri
    SOCKET_IO_PORT=your-socket-io-port
    ```

4. **Run the development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) to see your app in action.

## 📚 Usage

1. **Sign Up / Log In**: Authenticate using the secure login system.
2. **Explore**: Search for users, follow them, and engage with their content.
3. **Create and Interact with Posts**: Upload images, comment, like, and share posts.
4. **Real-Time Chat**: Connect with others instantly, with seen/unseen indicators and notification sounds.



---

Enjoy connecting with others in this feature-packed social platform clone! 🚀
