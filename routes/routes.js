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

router.get("/googled3ba8213735dc014.html" , (req,res)=>{
    res.sendFile((__dirname+'/googled3ba8213735dc014.html'));
    //__dirname : It will resolve to your project folder.
  });




module.exports = router;

