const mongoose = require("mongoose");

const AttendanceMarkingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  userid:{
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  longitude: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  timeOut: {
    type: Date
  },
  timing: {
    type: String,
    default: "",
  },
  mc: {
    type: Buffer
  },
  valid: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("AttendanceMarking", AttendanceMarkingSchema);
