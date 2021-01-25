const mongoose = require("mongoose");

const leaveApplicationSchema = new mongoose.Schema({
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    userid:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);