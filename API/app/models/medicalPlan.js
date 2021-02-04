const mongoose = require("mongoose");

const medicalPlanSchema = new mongoose.Schema({
    medicalPlanName: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    medicalCardFront: {
        type: Buffer,
        required: true
    },
    medicalCardBack: {
        type: Buffer,
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

module.exports = mongoose.model("MedicalPlan", medicalPlanSchema);