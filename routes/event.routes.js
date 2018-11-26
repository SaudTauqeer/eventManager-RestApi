const eventModel = require("../models/event.model");
const express = require("express");
const router = express.Router();

//Create a new event
router.post("/api/event", (req, res)=>{
    if (req.body){
        let model = new eventModel(req.body)
        model.save()
        .catch(err => {res.send(err)})
        .then(()=>{
            let response = {
                message: "Everything went fine and data is submitted",
                id: event._id,
                done : true
            };

            res.status(200).send(response)
        });
    }

});
//Get all events
router.get("/api/event", (req, res) =>{

    eventModel.find({}, (err, doc)=>{
        if (err) {
            const response = {
                message: "Bad request/Server error"
            }
            res.status(501).send(response);
        }
        
    });
});

//delete event by id
router.delete("/api/event/:eventId", (req, res)=>{
    eventModel.findOneAndDelete(req.params.eventId, (err, event) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    const response = {
        message: "event successfully deleted",
        id: event._id
    };
    return res.status(200).send(response);
});
});

//update event by id
router.put("/api/event/:eventId", (req, res)=>{
    
    eventModel.findByIdAndUpdate(req.params.eventId,
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
});


module.exports = router;