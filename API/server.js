const express = require("express");
const app = express();
const connectToMongoDB = require("./config/db");
const Attendance = require("./app/models/attendanceCode");

// Accept incoming request
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/password", require("./routes/api/forgotPassword"));
app.use("/api/employee", require("./routes/api/employee"));
app.use("/api/profile", require("./routes/api/profile"))
app.use("/api/feedback", require("./routes/api/feedback"))


var now = new Date();
var night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
var msToMidnight = night.getTime() - now.getTime();
console.log(now)
console.log(night)
console.log(msToMidnight)

makeAttendanceCode();
setInterval(function () {
    makeAttendanceCode();
}, 21600000);

var port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port: ` + port));

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text.toUpperCase();
}
function makeAttendanceCode(){
    var dt = new Date();
    dt2 = dt;
    console.log(dt2.toString());
    dt2.setHours(dt2.getHours() + 6);
    console.log(dt2.toString());
    // console.log("here 1")
    let newCode = new Attendance({
        code: makeid(),
        createdAt: dt,
        expiry: dt2
    });
    newCode.save()
    console.log(newCode)
}