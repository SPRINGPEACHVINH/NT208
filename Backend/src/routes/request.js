const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { Oauth2Client } = require("google-auth-library");

router.post('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8881");
    res.header("Refere-Policy", "no-referrer-when-downgrade");
    
    const redirectUrl = "http://localhost:8080";
    const Oauth2Client = new Oauth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    );

    const authorizeUrl = Oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ["https://www.googleapis.com/auth/userinfo.profile"],
        prompt: "consent",  
    });

    res.json({
        status: "OK",
        message: "Redirect to Google",
        url: authorizeUrl,
    });
})

module.exports = router;
