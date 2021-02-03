const mongoose = require("mongoose");
const config = require('config');

const leaveDaysSchema = new mongoose.Schema({
    userid:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true,
        default: new Date(new Date().getFullYear(), 11, 31)
    },
    numberOfLeaves: {
        type: String,
        required: true, 
        default: config.get('anualLeaveDays').toString()
    },
    status: {
        type: String,
        required: true, 
        default: "Active"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("LeaveDay", leaveDaysSchema);