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







module.exports = router;

