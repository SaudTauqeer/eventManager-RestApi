require('dotenv').config();
const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    if (req.user) {
        res.send(req.user.username);
    }
    if (!req.user) {
        res.send("not authorized please register first");
    }
});

router.get("/verify" , (req,res)=>{
    res.sendFile("../googled3ba8213735dc014.html");
});




module.exports = router;

