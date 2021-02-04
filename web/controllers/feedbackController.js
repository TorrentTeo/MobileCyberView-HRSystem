const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")

exports.getFeedback = async (req, res) => {
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    var newFeedbacks = [];
    await axios.get("http://localhost:5000/api/admin/allfeedback", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var feedbacks = resData.results.feedbacks;
        for(key in feedbacks){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var feedback = {
                regarding: feedbacks[key].regarding,
                content: feedbacks[key].content,
                name: feedbacks[key].name,
                date: new Date(feedbacks[key].createdAt).toDateString(),
                time: new Date(feedbacks[key].createdAt).toISOString().split("T")[1].split(".")[0],
                userid: feedbacks[key].userid
            }
            newFeedbacks.push(feedback)
        }      
    }).catch((error) => {
        console.log(error)
    });
    return res.render('feedback', { data: { feedbacks: newFeedbacks }})
}