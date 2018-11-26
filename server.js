require('dotenv').config();
var cors = require('cors');

// server config imports and routes
const routes = require("./routes/routes");
const eventRoute = require("./routes/event.routes");
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require("body-parser");

// cors and json middleware.
app.use(cors());
app.use(bodyParser.json());


//middleware
app.use(routes);
app.use(eventRoute);





app.listen(port, (error)=>{
    if (error) {throw error}
    else {console.log(`EventReminder REST API is running at http://localhost:${port}`)}
});