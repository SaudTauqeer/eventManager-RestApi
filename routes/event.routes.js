const userModel = require("../models/user.model");
const express = require("express");
const router = express.Router();

//Create a new event
router.post("/api/event", (req, res)=>{

    // statment that checks if form data is okay.
    const invalidFormStatement = 
    (req.body.data.event || req.body.data.sendingHour
    || req.body.data.sendingMinutes ||
    req.body.data.date || req.body.data.text ||
    req.body.data.subject || req.body.data.to ||
    req.body.data.from) === null || "";


    //if not a authorized user.
    if (!req.user) {res.sendStatus(401)};
    // if authorized
    if (req.user) {
    // Form data empty or not a user return 400 code.
        if (!req.user || invalidFormStatement) {
            res.sendStatus(400);
        }
        // if form is valid
        if (!invalidFormStatement)
        {
        let eventData = {
            "event": req.body.data.event, 
            "sendingHour": req.body.data.sendingHour, 
            "sendingMinutes": req.body.data.sendingMinutes,
            "cardUrl": req.body.data.cardUrl, 
            "date": req.body.data.date, 
            "text": req.body.data.text, 
            "subject": req.body.data.subject, 
            "to": req.body.data.to,
            "from":  req.body.data.from,
            "html": req.body.data.html
        };
        userModel.findByIdAndUpdate(req.user._id,
            { "$push": { "events":  eventData } },
            { "new": true, "upsert": true },
            function (err, doc) {
                if (err) throw err;
                res.sendStatus(201);
            }
        );
    }
}
});

// post timeZone data route.
router.post("/api/zone", (req, res)=> {
    //if not a authorized user.
    if (!req.user) {res.sendStatus(401)};
        //if a user
    if (req.user) {
        const timeZone = {timeZone: req.body.data.timeZone};
            userModel.findByIdAndUpdate(req.user._id,
                { "$push": { "userZone":  timeZone } },
                { "new": true, "upsert": true },
                function (err, doc) {
                    if (err) throw err;
                    res.sendStatus(201);
                });
    }
});

    
//Get all events
router.get("/api/event", (req, res) =>{
        //if not a user send 401 status code.
    if (!req.user) {res.sendStatus(401)};
        // if a registered user send events and 200 code.
    if (req.user) {
        userModel.findById(req.user._id, (err, data)=>{
            res.status(200).send(data.events);
        });
    }
});

// get current user.
router.get("/api/user", (req, res) =>{
        //if not a user send 401 status code.
        if (!req.user) {res.sendStatus(401)};
        // if a registered user send current username and 200 code.
    if (req.user) {
        userModel.findById(req.user._id, (err, data)=>{
            res.status(200).send(data.username);
        })
    }
});


    //delete event by id
    router.delete("/api/event/:eventId", (req, res)=>{
                //if not a user send 401 status code.
                if (!req.user) {res.sendStatus(401)};
            if (req.user) {
            // props.orignal is a react-table object containing props of the "e.target"
            // /api/event/:eventId --> eventId params is the specified event object id in the user document.
            //deletes event with the id from the events array of the current user.
        userModel.findByIdAndUpdate(req.user._id, {
            $pull: {events: {
                _id: req.params.eventId 
            }}
        }, function(err) {
            if (err) {res.status(400).send('Bad Request')};
            if (!err) {res.status(200).send("Succesfully deleted")};         
        });
        }
    });

//update event by id (Not added to the react side yet)

// router.put("/api/event/:eventId", (req, res)=>{
//     if (req.user) {
//         userModel.findByIdAndUpdate(req.params.eventIndex,
//             {$set:{
//                 "event": req.body.event, 
//                 "sendingHour": req.body.sendingHour, 
//                 "sendingMinutes": req.body.sendingMinutes,
//                 "cardUrl": req.body.cardUrl, 
//                 "date": req.body.date, 
    
//                 "text": req.body.text, 
//                 "subject": req.body.subject, 
//                 "to": req.body.to,
//                 "from":  req.body.from,
//                 "html": req.body.html
//         }
//             },{new:true} ,(err, event) => {
//         // As always, handle any potential errors:
//         if (err) return res.status(500).send(err);
//         const response = {
//             message: "event successfully updated",
//             id: event._id
//         };  
//         return res.status(200).send(response);
//     });
//     }

// });


module.exports = router;