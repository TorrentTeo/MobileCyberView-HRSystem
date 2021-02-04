const mongoose = require("mongoose");

const clinicListSchema = new mongoose.Schema({
    clinicName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    location : [{
        lat : String,
        lng : String
         }],
    userid:[{
        type: String,
        required: true
    }],
    name:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("ClinicList", clinicListSchema);