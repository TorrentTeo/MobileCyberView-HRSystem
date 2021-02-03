const mongoose = require("mongoose");
const config = require('config');

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
    name:{
        type: String,
        required: true
    },
    approved: {
        type: String,
        required: true,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: Buffer
    },
});

module.exports = mongoose.model("Leave", leaveApplicationSchema);