const { success, error, validation } = require("../../helpers/responseApi");
const feedbackmodel = require("../../models/feedback");
const Verification = require("../../models/verification");
const config = require('config');
var User = require("../../models/User");
const { validationResult } = require("express-validator");


exports.postFeedback = async (req, res, next) => {
    const { regarding, content, id } = req.body;
    try {
        let newFeedback = new feedbackmodel({
            regarding: regarding,
            content: content,
            userid: id
        });
        console.log(newFeedback);
        await newFeedback.save();
        // Send the response to server
        res.status(201).json(success("Thank You For Your Feedback", null, res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}
exports.getFeedback = async (req, res, next) => {
    const { id } = req.body;
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(validation(errors.array()));
        try {
            await feedbackmodel.find({ _id: id }, function (err, values) {
                var feedback = {};
                values.forEach(function (value) {
                    feedback[value._id] = value;
                });
                res.status(201).json(success("Code Retrived", { feedback }, res.statusCode))
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).json(error("Server error", res.statusCode));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}

exports.getAllFeedback = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty())
            return res.status(422).json(validation(errors.array()));
        try {

            var feedbacks = {};

            await feedbackmodel.find({}, function (err, values) {
                values.forEach(function(value) {

                    var newFeedback = {
                        _id: value._id,
                        regarding: value.regarding,
                        content: value.content,
                        name: value.userid,
                        createdAt: value.createdAt
                    };

                    feedbacks[value._id] = newFeedback;

                });   
            });

            for(key in feedbacks){
                console.log("here 3")
                
                var id = feedbacks[key].name

                console.log(id)

                let user = await User.findOne({ _id: id });
                console.log("user is")
                console.log(user)
                if(user == null){
                    feedbacks[key].name = ""
                }else{
                    feedbacks[key].name = user.name
                }              
            }
            res.status(201).json(success("Code Retrived", { feedbacks }, res.statusCode))
        } catch (err) {
            console.error(err.message);
            res.status(500).json(error("Server error", res.statusCode));
        }
        // Send the response to server
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}