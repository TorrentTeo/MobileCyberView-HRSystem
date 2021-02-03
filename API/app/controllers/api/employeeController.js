const { success, error, validation } = require("../../helpers/responseApi");
const AttendanceCode = require("../../models/attendanceCode");
const AttendanceMarking = require("../../models/attendanceMarking");
const Verification = require("../../models/Verification");
const config = require('config');

exports.dashboard = async (req, res, next) => {
    res.send('sup homies')
}

exports.attendance = async (req, res, next) =>
{
    const { code, longitude, latitude } = req.body;
    try {
        let hasCode = await AttendanceCode.findOne({ code: code });

        // Check the user email
        if (!hasCode)
            return res.status(422).json(validation({ msg: "Invalid code" }));

        const dateOfExpiry = Date.parse(hasCode.expiry);
        
        var expired  = dateOfExpiry < Date.now() ? true: false;

        if(expired)
            return res.status(422).json(validation({ msg: "Code has expired" }));
        
        let newAttendance = new AttendanceMarking({
            name: req.user.name,
            userid: req.user.id,
            email: req.user.email,
            valid: true, 
            longitude:longitude,
            latitude: latitude  
        });
        
        console.log(newAttendance);
        console.log(req.user);
        await newAttendance.save();
        // Send the response to server
        res.status(201).json(success("Attendance Taken",
                {
                    user: {

                    }
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.getAttendanceCode = async (req, res, next) =>
{
    try {
        let hasCode = await AttendanceCode.find().limit(1).sort({$natural:-1})

        // Check the user email
        if (!hasCode)
            return res.status(422).json(validation({ msg: "Invalid code" }));

        const dateOfExpiry = Date.parse(hasCode.expiry);
        
        var expired  = dateOfExpiry < Date.now() ? true: false;

        if(expired)
            return res.status(422).json(validation({ msg: "Code has expired" }));       
        // Send the response to server
        res.status(201).json(success("Code Retrived",
                {
                    hasCode
                },
                res.statusCode
            )
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};

exports.getAllAttendance = async (req, res, next) =>
{
    try {
        await AttendanceMarking.find({}, function(err, values) {
            var attendance = {};
       
            values.forEach(function(value) {
                attendance[value._id] = value;
            });
            res.status(201).json(success("Code Retrived",{attendance},res.statusCode))
          });    
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
};