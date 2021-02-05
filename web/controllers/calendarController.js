const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")
exports.getCalendar = async (req, res) => {

    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    var newLeaveRequests = [];
    await axios.get("http://localhost:5000/api/admin/AllLeave", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var leaveRequests = resData.results.leave;
        for(key in leaveRequests){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var leave = {
                approved: leaveRequests[key].approved,
                requestDate: new Date(leaveRequests[key].from).toDateString(),
                numberOfDays: daysBetween(leaveRequests[key].from, leaveRequests[key].to),
                status: leaveRequests[key].approved,
                mc: leaveRequests[key].image,
                name: leaveRequests[key].name,
                id: key,
                userid: leaveRequests[key].userid
            }
            newLeaveRequests.push(leave)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })


    var newCalendarRequests = [];
    await axios.get("http://localhost:5000/api/employee/Allcalendar", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var calendarRequests = resData.results.calendar;
        for(key in calendarRequests){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var calendar = {
                date: new Date(calendarRequests[key].date).toDateString(),
                activity: calendarRequests[key].activity,
                time: new Date(calendarRequests[key].date).toISOString().split("T")[1].split(".")[0],
                id: key
            }
            newCalendarRequests.push(calendar)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })       
    var newAllLeaveDays = [];
    await axios.get("http://localhost:5000/api/admin/AllLeaveDays", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var allLeaveDays = resData.results.leaveDays;
        for(key in allLeaveDays){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var leaveDay = {
                name: allLeaveDays[key].name,
                expiryDate: new Date(allLeaveDays[key].expiryDate).toDateString(),
                status: allLeaveDays[key].status,
                numberOfLeaves: allLeaveDays[key].numberOfLeaves
            }
            newAllLeaveDays.push(leaveDay)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })  
    return res.render('calendar', {data: {leaveRequests: newLeaveRequests, calendar: newCalendarRequests, leaveDays: newAllLeaveDays }})
}

exports.approveLeave = async (req, res) => {   
    url = "http://localhost:5000/api/admin/approveLeave";
    var {id, days, userid}=  req.body
    var data = { id:id, days:days, userid:userid} 
    console.log(data)
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.put(url, data, {headers: headers}).then((response) => {
        var resData = response.data;
        console.log(resData)
    }).catch((error) => {
        console.log(error)
        return error;
    })       
    return res.redirect('/calendar');
}

exports.denyLeave = async (req, res) => { 
    url = "http://localhost:5000/api/admin/denyLeave";
    var {id}=  req.body
    var data = {id:id} 
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};

    await axios.put(url,data, {headers: headers}).then((response) => {
        var resData = response.data;
        console.log(resData)
    }).catch((error) => {
        console.log(error)
        return error;
    })       
    return res.redirect('/calendar');
}

exports.postActivities = async (req, res) => {
    url = "http://localhost:5000/api/admin/calendar";
    var data ={ activity, date} = req.body
    console.log(data)
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.post(url,data, {headers: headers}).then((response) => {
        var resData = response.data;
        console.log(resData)
        return res.redirect('/calendar');
    }).catch((error) => {
        console.log(error)
        return res.redirect('/calendar');
    })    
};
