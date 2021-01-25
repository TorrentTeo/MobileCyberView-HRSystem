const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
    point: {
        type: Number,
        minlength: 1,
        maxlength: 64,  
    },
    userid:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
      }
});

module.exports = mongoose.model("Wallet", WalletSchema);