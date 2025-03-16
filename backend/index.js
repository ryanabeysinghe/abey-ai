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

app.use(cors({
    origin: process.env.CLIENT_URL,
}))

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

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})

// console.log("test3");