const { success, error, validation } = require("../../helpers/responseApi");
const AttendanceCode = require("../../models/attendanceCode");
const AttendanceMarking = require("../../models/attendanceMarking");
const Verification = require("../../models/verification");
const config = require('config');
const User = require("../../models/User");
const Profile = require("../../models/profile");


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

exports.getAllEmployee = async (req, res) => {

    try {
        await User.find({}, function(err, values) {
            var user = {};
       
            values.forEach(function(value) {
                user[value._id] = value;
            });
            res.status(201).json(success("Code Retrived",{user},res.statusCode))
          });    
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }


}

exports.getProfile = async (req, res) => {

    try {
        await Profile.find({}, function(err, values) {
            var profile = {};
       
            values.forEach(function(value) {
                profile[value._id] = value;
            });
            res.status(201).json(success("Code Retrived",{profile},res.statusCode))
          });    
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}


exports.putAttendance = async (req, res) => {
    const { time } = req.body;
    try {   
        const { id, time } = req.body;
        //Check whether the _id given is valid or not
        const filter = { userid: id, timing: "" };
        const update = { timing: time };
        //Update user data
        let hasCode = await AttendanceMarking.find(filter).limit(1).sort({$natural:-1})
        console.log(hasCode[0]._id)
        let doc = await AttendanceMarking.findByIdAndUpdate(hasCode[0]._id, update, {
            new: true
          });

            res.status(200).json(success("Edited successfully",
            {
                
            },
            res.statusCode
        )
    );
    } catch (err) {
        console.error(err.message);
        res.status(500).json(error("Server error", res.statusCode));
    }
}