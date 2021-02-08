const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema({
    feedType: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 20
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    createdAt: {
        type: Date,
        required: true,
        default:Date.now()
    },
    userid:[{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      }],
    namelist:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("Feed", FeedSchema);