const { success, error, validation } = require("../../helpers/responseApi");
const Calendar = require("../../models/calendar");
const Verification = require("../../models/Verification");
const config = require('config');
const { validationResult } = require("express-validator");

exports.getCalendar = async (req, res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));

    const { date } = req.body;
    try {
        let events = await Calendar.find({}).where('date').equals(date)

        // Check the user email
        if (!events)
            return res.status(422).json(validation({ msg: "No events found" }));

        // Send the response to server
        res.status(201).json(success("Code Retrived",
                {
                    events
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.postCalendar = async (req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    
    const { date, activity} = req.body;
    var dateobj =  new Date(date);
    console.log(dateobj)
    var B = dateobj.toISOString(); 
    console.log(B)
    try {
        let newCalendar = new Calendar({
            date: date,
            activity: activity
        });
        console.log(newCalendar);
        await newCalendar.save();       
        // Send the response to server
        res.status(201).json(success("Successfully Created New Recored Created",null,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.putCalendar = async (req,res,next)=> {
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(validation(errors.array()));
        const { id, activity } = req.body;
        let events = await Calendar.find({}).where('date').equals(date)
        await Calendar.findByIdAndUpdate(id,{"activity": activity}, function(err, result){
            if(err){
                res.status(422).json(error("Error Updating Record", err, res.statusCode));
            }
            else{
                res.status(201).json(success("Successfully Updated Record",null,res.statusCode));
            } 
        });
    }catch(err){
        console.log(err)
    }
}

exports.deleteCalendar = async (req,res,next)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { id } = req.body;
    await Calendar.remove({ _id: id}, function(err) {
        if(err){
            res.status(422).json(error("Error Deleting Record", err, res.statusCode));
        }
        else{
            res.status(201).json(success("Successfully Deleted Record",null,res.statusCode));
        } 
    });
}