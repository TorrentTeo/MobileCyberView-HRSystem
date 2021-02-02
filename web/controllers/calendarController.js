const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")
exports.getCalendar = async (req, res) => {
    var url = "http://localhost:5000/api/admin/AllLeave";
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    var newLeaveRequests = [];
    await axios.get(url, {headers: headers} ,data).then((response) => {
        console.log(`statusCode: ${response.data.code}`)
        console.log(response.data)
        var resData = response.data;
        var leaveRequests = resData.results.leave;
        console.log(leaveRequests)

        for(key in leaveRequests){
            console.log(leaveRequests[key])
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var leave = {
                approved: leaveRequests[key].approved,
                requestDate: new Date(leaveRequests[key].from).toDateString(),
                numberOfDays: daysBetween(leaveRequests[key].from, leaveRequests[key].to),
                status: leaveRequests[key].approved,
                mc: leaveRequests[key].image,
                name: leaveRequests[key].name
            }
            newLeaveRequests.push(leave)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })


    url = "http://localhost:5000/api/employee/Allcalendar";
    var newCalendarRequests = [];
    await axios.get(url, {headers: headers} ,data).then((response) => {
        console.log(`statusCode: ${response.data.code}`)
        console.log(response.data)
        var resData = response.data;
        var calendarRequests = resData.results.calendar;
        console.log(calendarRequests)

        for(key in calendarRequests){
            console.log(calendarRequests[key])
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var calendar = {
                date: new Date(calendarRequests[key].date).toDateString(),
                activity: calendarRequests[key].activity,
                time: new Date(calendarRequests[key].date).toISOString().split("T")[1].split(".")[0]
            }
            newCalendarRequests.push(calendar)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })       
    res.render('calendar', {data: {leaveRequests: newLeaveRequests, calendar: newCalendarRequests }})
}