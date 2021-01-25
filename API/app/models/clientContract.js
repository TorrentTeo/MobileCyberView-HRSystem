const mongoose = require("mongoose");

const clientContractSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5
    },
    terms: {
        type: String,
        required: true,
        minlength: 5
    },
    parties:{
        type: {},
        required: true
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

module.exports = mongoose.model("ClientContract", clientContractSchema);