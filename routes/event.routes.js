const userModel = require("../models/user.model");
const express = require("express");
const router = express.Router();

//Create a new event
router.post("/api/event", (req, res)=>{
    if (req.user && req.body.data) {
        let eventData = {
            "event": req.body.data.event, 
            "sendingHour": req.body.data.bodysendingHour, 
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
                console.log(doc);
            }
        );
    }
});
    
    // if (req.body && req.user){
        //     let model = new userModel(req.body)
        //     model.save()
        //     .then(events => {
        //         console.log(events);
            
        // })
        // .catch(err => {res.send(err)})
        // .then(()=>{
        //     let response = {
        //         message: "Everything went fine and data is submitted",
        //         id: event._id,
        //         done : true
        //     };

        //     res.status(200).send(response)
        // });
    // }

//Get all events
router.get("/api/event", (req, res) =>{
    if (req.user) {
        userModel.findById(req.user._id, (err, data)=>{
            res.send(data.events);
        })
    }
});

//delete event by id
    router.delete("/api/event/:eventId", (req, res)=>{
        if (req.user) {
            
        userModel.findByIdAndUpdate(req.user._id, {
            $pull: {events: {
                _id: req.params.eventId 
            }}
        }, function(err) {
            console.log(err);
        });
        }
    });

//     //     userModel.findOneAndDelete({ _id : req.params.id}, (err, event) => {
//     //         // As always, handle any potential errors:
//     //         if (err) return res.status(500).send(err);
//     //         const response = {
//     //             message: "event successfully deleted",
//     //             id: event._id
//     //         };
            
//     //         return res.status(200).send(response);
//     //     });
//     // }

// });

//update event by id
router.put("/api/event/:eventId", (req, res)=>{
    if (req.user) {
        userModel.findByIdAndUpdate(req.params.eventIndex,
            {$set:{
                "event": req.body.event, 
                "sendingHour": req.body.sendingHour, 
                "sendingMinutes": req.body.sendingMinutes,
                "cardUrl": req.body.cardUrl, 
                "date": req.body.date, 
    
                "text": req.body.text, 
                "subject": req.body.subject, 
                "to": req.body.to,
                "from":  req.body.from,
                "html": req.body.html
        }
            },{new:true} ,(err, event) => {
        // As always, handle any potential errors:
        if (err) return res.status(500).send(err);
        const response = {
            message: "event successfully updated",
            id: event._id
        };  
        return res.status(200).send(response);
    });
    }

});


module.exports = router;