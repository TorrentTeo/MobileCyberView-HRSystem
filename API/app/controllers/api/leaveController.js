const { success, error, validation } = require("../../helpers/responseApi");
const ClientContract = require("../../models/clientContract");
const Verification = require("../../models/Verification");
const config = require('config');
const { validationResult } = require("express-validator");
const Leave = require("../../models/leaveApplication");


exports.getLeave = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { id } = req.body;
    try {
        const user = await User.findOne({ _id: id });
        res.status(201).json(success("Thank You For Your Feedback",null,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.getAllLeave = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    try {
        await Leave.find({}, function(err, values) {
            var leave = {};   
            values.forEach(function(value) {
                leave[value._id] = value;
            });
            res.status(201).json(success("Code Retrived",{leave},res.statusCode))
          });   
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.postLeave = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { from, to, reason, image } = req.body;
    try {
        let newLeave = new Leave({
            from: from,
            to: to, 
            reason: reason,
            userid: req.user.id, 
            name: req.user.name,
            image: image
        });
        console.log(newLeave);
        await newLeave.save();       
        // Send the response to server
        res.status(201).json(success("Successfully Created New Recored Created",newLeave,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.putLeave = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { from, to, reason } = req.body;
    await Leave.findByIdAndUpdate(id,{"from": from, "to": to, "reason": reason}, function(err, result){
        if(err){
            res.status(422).json(error("Error Updating Record", err, res.statusCode));
        }
        else{
            res.status(201).json(success("Successfully Updated Record",null,res.statusCode));
        } 
    });
}

exports.deleteLeave = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { id } = req.body;
    await Leave.remove({ _id: id}, function(err) {
        if(err){
            res.status(422).json(error("Error Deleting Record", err, res.statusCode));
        }
        else{
            res.status(201).json(success("Successfully Deleted Record",null,res.statusCode));
        } 
    });
}

exports.approveLeave = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(422).json(validation(errors.array()));
    const { id } = req.body;
    await Leave.findByIdAndUpdate(id,{"approved": true}, function(err, result){
        if(err){
            res.status(422).json(error("Error Updating Record", err, res.statusCode));
        }
        else{
            res.status(201).json(success("Successfully Updated Record",null,res.statusCode));
        } 
    });
}