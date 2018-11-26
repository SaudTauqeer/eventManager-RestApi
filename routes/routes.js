const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
res.send("go to /api/event and use different CRUD methods").json()});








module.exports = router;

