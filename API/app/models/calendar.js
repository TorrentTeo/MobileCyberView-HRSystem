const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model("Calendar", calendarSchema);