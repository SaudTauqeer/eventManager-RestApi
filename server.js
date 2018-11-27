require('dotenv').config();
var cors = require('cors');

// server config imports and routes
const routes = require("./routes/routes");
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRoutes = require("./routes/authRoute");
const eventRoute = require("./routes/event.routes");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

// cors and json middleware.
app.use(cors());
app.use(bodyParser.json());


// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_KEY]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//// set up routes
app.use('/auth', authRoutes);
app.use(routes);
app.use(eventRoute);


app.listen(port, (error)=>{
    if (error) {throw error}
    else {console.log(`EventReminder REST API is running at http://localhost:${port}`)}
});