const mongoose = require("mongoose");

const AttendanceCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 10,
    },
    createdAt: {
        type: Date,
        required: true
    },
    expiry: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("AttendanceCode", AttendanceCodeSchema);