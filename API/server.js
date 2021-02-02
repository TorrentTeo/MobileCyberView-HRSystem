const express = require("express");
const app = express();
const connectToMongoDB = require("./config/db");
const { makeAttendanceCode, randomString } = require("./app/helpers/common")

// Accept incoming request
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/password", require("./routes/api/forgotPassword"));
app.use("/api/employee", require("./routes/api/employee"));
app.use("/api/admin", require("./routes/api/admin"));


var port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ` + port));


makeAttendanceCode(randomString(5).toUpperCase());
setInterval(function () {
    makeAttendanceCode(randomString(5).toUpperCase());
}, 21600000);