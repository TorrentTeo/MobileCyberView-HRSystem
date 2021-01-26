const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    date: {
        type: Date,
        required: true
    },
    userid:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    writtenBy: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

module.exports = mongoose.model("Profile", ProfileSchema);