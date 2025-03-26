/* This file serves to run Express server */

/* 
Changed scripts package.json to add ("start": "nodemon index.js") so nodemon can be used for real-time changes
*/

//import express from "express";
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

const ImageKit = require('imagekit');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const Chat = require('./models/chat.js');
const UserChats = require('./models/userChats.js');

// import express from "express";
// import cors from "cors";
// import ImageKit from "imagekit";
// import mongoose from "mongoose";
// import Chat from "./models/chat.js";
// import UserChats from "./models/userChats.js";
// const app = express();
// const port = process.env.PORT || 3000;

/* Middleware for request-reponse cycle */
app.use(cors({
    origin: process.env.CLIENT_URL,
}));

app.use(express.json())

/* Function to connect to MongoDB using connection string */
const connect_mongo_db = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STR)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_URL_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

// Represents first API Endpoint (GET request)
app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

app.post("/api/chats", async (req, res) => {
    const { userId, text} = req.body;
    
    try {
        // CREATE A NEW CHAT
        const newChat = new Chat({
            userId: userId,
            history: [{role: "user", parts: [{ text }]}],
        });

        const savedChat = await newChat.save();

        //Check if the User Chat Exists
        const userChats = await UserChats.find({ userId: userId });;

        // If Chat doesn't exist create a new one and add the chat in the chats array
        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [
                    {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    },
                ],
            });

            await newUserChats.save();
        } else {
            // If exists, push the chat to the existing array
            await UserChats.updateOne({ userId: userId }, {
                $push: {
                    chats: {
                        _id: savedChat._id,
                        title: text.substring(0, 40),
                    },
                },
            });

            res.status(201).send(newChat._id);
        }

        //const savedChat = await newChat.save();
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while creating chat!");
    }
})

app.listen(port, () => {
    connect_mongo_db();
    console.log(`server running on port ${port}`);
})

// console.log("test3");