const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    activities: {
        type: Array,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("LeaveApplication", leaveApplicationSchema);