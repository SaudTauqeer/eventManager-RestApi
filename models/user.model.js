const mongoose = require('mongoose');
const MONGO_USER = process.env.MONGO_USER_ID;
const MONGO_PW = process.env.MONGO_USER_PW;

mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PW}@ds159993.mlab.com:59993/events-db`, { useNewUrlParser: true });

let TimeZoneSchema = new mongoose.Schema({
    timeZone: {type:String, required: true},
});


let EventSchema = new mongoose.Schema({
    event: {type:String, required: true},
    sendingHour: {type: String, required:true},
    sendingMinutes: {type: String, required:true },
    cardUrl: {type: String, },
    date: {type:String, required: true},

    text: {type:String, required: true, },
    subject: {type:String, required: true},
    to: {type:String, required: true },
    from: {type:String, required:true},
    month: {type:String, required:true, trim: true},
    year: {type:String, required:true,trim:true},
    day: {type:String, required:true, trim:true},
    sent: {type: Boolean}
});



const UserSchema = new mongoose.Schema({
    googleId:  {type: String},
    username: {type: String},
    thumbnail: {type: String},
    events:  [EventSchema],
    userZone: [TimeZoneSchema]
    
});






module.exports = mongoose.model("User", UserSchema);