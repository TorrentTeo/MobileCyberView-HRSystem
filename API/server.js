const express = require("express");
const app = express();
const connectToMongoDB = require("./config/db");
const { makeAttendanceCode, randomString, leaveDays } = require("./app/helpers/common")
var LeaveDays = require("./app/models/leaveDays")
const User = require("./app/models/User");

// Accept incoming request
app.use(express.json({ extended: false }));

// Connect to MongoDB
connectToMongoDB();

// Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/password", require("./routes/api/forgotPassword"));
app.use("/api/employee", require("./routes/api/employee"));
app.use("/api/admin", require("./routes/api/admin"));



app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});



makeAttendanceCode(randomString(5).toUpperCase());
var ld = leaveDays()
if(ld){
    try {
        User.find({}, function(err, values) {
            LeaveDays.remove({}, function(err) { 
                console.log('collection removed') 
             });

            values.forEach(function(value) {
                var leaveDay = new LeaveDays({
                    userid: value._id,
                    name: value.name                   
                });
                leaveDay.save()
            });
        }); 

    } catch (err) {
        console.error(err.message);
    }
}
setInterval(function () {
    leaveDays()
    makeAttendanceCode(randomString(5).toUpperCase());
}, 21600000);