var cors = require('cors');
require('dotenv').config();
const express = require("express");
const app = express();

// app.options('*', cors())
// app.use(cors({origin: null}));
const port = process.env.PORT;


// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://eventmanager-web.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept , credentials');

    res.setHeader('Access-Control-Request-Headers', 'Origin, X-Requested-With, Content-Type, Accept ,credentials');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// server config imports and routes
const passportSetup = require('./config/passportSetup');
const routes = require("./routes/routes");
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require("body-parser");

const authRoutes = require("./routes/authRoute");
const eventRoute = require("./routes/event.routes");

//heroku stop idling route for pining.
app.get("/api-ping", (req, res)=>{
    const date = new Date().toLocaleString();
    res.send(`rest api pinged at ${date}`);
});


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