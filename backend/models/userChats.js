const mongoose = require('mongoose');
//import mongoose from "mongoose";

const userChatsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    chats: [
        {
            _id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        },
    ],
}, {timestamps: true});

module.exports = mongoose.models.userChats || mongoose.model("userChats", userChatsSchema);