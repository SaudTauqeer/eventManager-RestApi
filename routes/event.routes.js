const userModel = require("../models/user.model");
const express = require("express");
const router = express.Router();
const password = process.env.ALL_USER_DATA_ROUTE_PASSWORD;

//Create a new event
router.post("/api/event", (req, res)=>{
    if (!res.user) {return res.sendStatus(401)};
    // event data to be stored.
let eventData = {
    "event": req.body.event, 
    "sendingHour": req.body.sendingHour, 
    "sendingMinutes": req.body.sendingMinutes,
    "cardUrl": req.body.cardUrl, 
    "year": req.body.year,
    "month": req.body.month,
    "day": req.body.day, 
    "text": req.body.text, 
    "subject": req.body.subject, 
    "to": req.body.to,
    "from":  req.body.from,
    "html": req.body.html,
    "sent" : false
};
if (req.user){
    if (eventData === null || ""){return res.sendStatus(401)};
    userModel.findByIdAndUpdate(req.user._id,
        { "$push": { "events":  eventData } },
        { "new": true, "upsert": true },
         function (err, doc) {
             if (err) throw err;
            res.sendStatus(201);
        }
    );
}
});

// userModel.findByIdAndUpdate(req.user._id,
//     { "$push": { "events":  eventData } },
//     { "new": true, "upsert": true },
//     function (err, doc) {
//         if (err) console.log(err);
//         res.sendStatus(201);
//     }
// );
// post timeZone data route.
router.post("/api/zone", (req, res)=> {
    //if not a authorized user.
    if (!req.user) {res.sendStatus(401)};
        //if a user
    if (req.user) {
        const timeZone = {timeZone: req.body.timeZone};
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

// get current user data.
router.get("/api/user", (req, res) =>{
        //if not a user send 401 status code.
        if (!req.user) {res.sendStatus(401)};
        // if a registered user send current username and 200 code.
    if (req.user) {
        userModel.findById(req.user._id, (err, data)=>{
            res.status(200).send(data);
        })
    }
});

//protected route
router.get("/api/all/:pw", (req, res) => {
    if (req.params.pw === password) {
        userModel.find({})
        .then(allUserData => res.send(allUserData))
        .catch(err => res.sendStatus(500))
    }
    if (req.params.pw !== password) {
        res.sendStatus(401);
    }
    if (req.params === null || undefined) {
        res.sendStatus(401);
    }
});



        //updates sent status of an event.
        //protected route.
        router.get("/api/done/:pw/:eventId", (req,res)=>{
        if (req.params.pw === password) {

            userModel.update(
            { 'events._id': req.params.eventId },
            { $set:  { 'events.$.sent': true }},
            (err, result) => {
              if (err) {
                res.status(500)
                .json({ error: 'Unable to update event status.', });
              } else {
                res.sendStatus(200);
              }
           }
          );
        }
        if (req.params.pw !== password) {
            res.sendStatus(401);
        }
        if (req.params === null || undefined) {
            res.sendStatus(401);
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