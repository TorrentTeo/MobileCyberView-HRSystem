const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    regarding: {
        type: String,
        required: true,
        minlength: 5
    },
    content: {
        type: String,
        required: true,
        minlength: 5
    },
    userid:{
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

module.exports = mongoose.model("Feedback", feedbackSchema);