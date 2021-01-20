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
    const { code } = req.body;
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
            valid: true
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