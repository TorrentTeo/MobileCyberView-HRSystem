const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")

exports.getAttendanceCode = async (req, res) => {
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.get("http://localhost:5000/api/admin/Attendance", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var leaveRequests = resData.results.hasCode;
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
            var seconds = ( new Date(attendanceResponse[key].timing).getTime()- new Date(attendanceResponse[key].createdAt).getTime()) / 1000
            try{
                var attendance = {
                    name: attendanceResponse[key].name,
                    date: new Date(attendanceResponse[key].createdAt).toDateString(),
                    timein: new Date(attendanceResponse[key].createdAt).toISOString().split("T")[1].split(".")[0],
                    timeout: new Date(attendanceResponse[key].timing).toISOString().split("T")[1].split(".")[0],
                    longitude: attendanceResponse[key].longitude,
                    latitude: attendanceResponse[key].latitude,
                    timing:  secondsToHms(seconds), 
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
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hrs ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min " : " mins ") : "";

    // return hDisplay + mDisplay + sDisplay; 
    return hDisplay + mDisplay;
}