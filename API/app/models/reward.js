const mongoose = require("mongoose");

const RewardSchema = new mongoose.Schema({
    name: {
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
    validFrom: {
      type: Date,
      required: true
  },
    expiryDate: {
        type: Date,
        required: true
    },
    userid:[{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      }],
    valid:{
        type: Boolean,
        default: true,
    },
    namelist:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("Reward", RewardSchema);