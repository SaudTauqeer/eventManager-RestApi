const mongoose = require('mongoose');
const MONGO_USER = process.env.MONGO_USER_ID;
const MONGO_PW = process.env.MONGO_USER_PW;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PW}@ds159993.mlab.com:59993/events-db`, { useNewUrlParser: true }  );


let EventSchema = new mongoose.Schema({
    event: {type:String, required: true},
    sendingHour: {type: Number, required:true},
    sendingMinutes: {type: Number, required:true },
    cardUrl: {type: String, },
    date: {type:String, required: true},

    text: {type:String, required: true, },
    subject: {type:String, required: true},
    to: {type:String, required: true },
    from: {type:String, required:true}
});



const UserSchema = new mongoose.Schema({
    googleId:  {type: String},
    username: {type: String},
    thumbnail: {type: String},
    events:  [EventSchema]
    
});






module.exports = mongoose.model("User", UserSchema);