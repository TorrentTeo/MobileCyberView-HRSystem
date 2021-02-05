const mongoose = require("mongoose");

const insuranceCoverageSchema = new mongoose.Schema({
    typeofInsurance: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    contactPerson: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    contactNumber: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    userid:[{
        type: String,
        required: true
    }],
    name:[{
        type: String,
        required: true
    }]
});

module.exports = mongoose.model("InsuranceCoverage", insuranceCoverageSchema);