const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")

exports.getAttendanceCode = async (req, res) => {
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.get("http://localhost:5000/api/admin/Attendance", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var leaveRequests = resData.results.hasCode;
        console.log(leaveRequests)
        return res.status(200).json({leaveRequests});;
    }).catch((error) => {
        console.log(error)
        return error;
    })
}

exports.getAttendance = async (req, res) => {
    var newAttendanceResponse = [];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.get("http://localhost:5000/api/admin/AllAttendance", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var attendanceResponse = resData.results.attendance;
        for(key in attendanceResponse){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            try{
                var attendance = {
                    name: attendanceResponse[key].name,
                    date: new Date(attendanceResponse[key].createdAt).toDateString(),
                    timein: new Date(attendanceResponse[key].createdAt).toISOString().split("T")[1].split(".")[0],
                    timeout: new Date(attendanceResponse[key].timeout).toISOString().split("T")[1].split(".")[0],
                    longitude: attendanceResponse[key].longitude,
                    latitude: attendanceResponse[key].latitude,
                    timing: attendanceResponse[key].timing, 
                    mc:  attendanceResponse[key].mc
                }
            }catch(err){
                var attendance = {
                    name: attendanceResponse[key].name,
                    date: new Date(attendanceResponse[key].createdAt).toDateString(),
                    timein: new Date(attendanceResponse[key].createdAt).toISOString().split("T")[1].split(".")[0],
                    timeout: null,
                    longitude: attendanceResponse[key].longitude,
                    latitude: attendanceResponse[key].latitude,
                    timing: attendanceResponse[key].timing,
                    mc:  attendanceResponse[key].mc
                }
            }

            newAttendanceResponse.push(attendance)
        }
        res.render('attendance', {data: {attendance: newAttendanceResponse}})
    }).catch((error) => {
        console.log(error)
        return error;
    })

}