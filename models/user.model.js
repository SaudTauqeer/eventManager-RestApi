const mongoose = require('mongoose');
const eventSubSchema = require("../models/event.model");
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PW}@ds159993.mlab.com:59993/events-db`, { useNewUrlParser: true }  );


let UserSchema = new mongoose.Schema({
    name: String,
    profileThumbnail: String,
    googleid: String,
    events: [
        eventSubSchema
    ]
});





module.exports = mongoose.model("User", UserSchema);