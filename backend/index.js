/* This file serves to run Express server */

/* 
Changed scripts package.json to add ("start": "nodemon index.js") so nodemon can be used for real-time changes
*/

//import express from "express";
// const express = require('express')
// const app = express();
// const port = process.env.PORT || 3000;

// const ImageKit = require('imagekit');
// const cors = require('cors');
// const { default: mongoose } = require('mongoose');
// const Chat = require('./models/chat.js');
// const UserChats = require('./models/userChats.js');

import express from "express";
import cors from "cors";
import ImageKit from "imagekit";
import mongoose from "mongoose";
import Chat from "./models/chat.js";
import UserChats from "./models/userChats.js";
import { requireAuth, clerkClient } from "@clerk/express";

const app = express();
const port = process.env.PORT || 3000;

/* Middleware for request-reponse cycle */
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
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
});

// app.get("/api/test", requireAuth(), (req, res) => {
//     // Get the `userId` from the `Auth` object
//     const userId = req.auth.userId

//     // If user isn't authenticated, return a 401 error
//     if (!userId) {
//         res.status(401).json({ error: 'User not authenticated' })
//         //res.status(401).send('Unauthenticated!');
//     }

//     console.log(userId);
//     res.send("Success!");
// });

app.post("/api/chats", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;
    
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
});

app.get("/api/userchats", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;

    try {
        const userChats = await UserChats.find({ userId });

        res.status(200).send(userChats[0].chats);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while creating userchats!");
    }
});

// Fetching single chats
app.get("/api/chats/:id", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;

    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId });

        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error while creating chat!");
    }
});

app.put("/api/chats/:id", requireAuth(), async (req, res) => {
    const userId = req.auth.userId;

    const { question, answer, img } = req.body;

    const newItems = [
        ...(question 
            ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
            : []),
        { role: "model", parts: [{ text: answer }] },
    ];

    try {

        const updatedChat = await Chat.updateOne(
            { _id: req.params.id, userId }, 
            {
                $push: {
                    history: {
                        $each: newItems,
                    },
                },
            },
        );

        res.status(200).send(updatedChat);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error adding conversation!");
    }
}); 

// Error handling for Clerk requireAuth
// app.use((err, req, res, next) => {
//     console.error("Custom Clerk error:", err.stack);
//     res.status(401).send('Unauthenticated!');
// });

app.listen(port, () => {
    connect_mongo_db();
    console.log(`server running on port ${port}`);
})

// console.log("test3");