const mongoose = require("mongoose");

const mcSchema = new mongoose.Schema({
    image: {
        type: Buffer,
        required: true
    },
    leaveid:{
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

module.exports = mongoose.model("MC", mcSchema);