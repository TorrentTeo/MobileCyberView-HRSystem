const { success, error, validation } = require("../../helpers/responseApi");
const feedbackmodel = require("../../models/feedback");
const Verification = require("../../models/Verification");
const config = require('config');

exports.feedbackPost = async (req, res, next) => {
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
        res.status(201).json(success("Thank You For Your Feedback",null,res.statusCode));
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}