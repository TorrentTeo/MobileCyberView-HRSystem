const mongoose = require("mongoose");

const medicalPlanSchema = new mongoose.Schema({
    medicalPlanName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    medicalCardFront: {
        type: String,
    },
    medicalCardBack: {
        type: String,
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

module.exports = mongoose.model("MedicalPlan", medicalPlanSchema);