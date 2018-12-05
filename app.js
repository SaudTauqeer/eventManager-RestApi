var cors = require('cors');
require('dotenv').config();
const express = require("express");
const app = express();
app.use(cors());
const port = process.env.PORT;

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
      res.send(200);
    } else {
        next();
    }
  });



// server config imports and routes
const passportSetup = require('./config/passportSetup');
const routes = require("./routes/routes");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoute");
const eventRoute = require("./routes/event.routes");



// cors and bodyparser.
// app.use(cors());
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