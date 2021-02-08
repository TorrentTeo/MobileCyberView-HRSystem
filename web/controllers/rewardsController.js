const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getReward = async (req, res) => {
    var url = "http://localhost:5000/api/admin/allReward";
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + cookie};

    var newReward = [];
    await axios.get(url, {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var reward = resData.results.reward;
        for(key in reward){
            var rewards = {
                namelist: reward[key].namelist,
                rewardName: reward[key].name,
                description: reward[key].description,
                validFrom: new Date(reward[key].validFrom).toDateString(),
                expiryDate: new Date(reward[key].expiryDate).toDateString(),
                valid: reward[key].valid,
                id: reward[key]._id            
            }
            newReward.push(rewards)
        }
        
    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newEmployee = [];
    await axios.get("http://localhost:5000/api/admin/AllEmployee", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var employee = resData.results.user;
        for(key in employee){
            var employees = {
                name: employee[key].name,
                email: employee[key].email,
                contact: employee[key].contact,
                _id: employee[key]._id
            }
            newEmployee.push(employees)
        }
        
    }).catch((error) => {
        console.log(error)
        return error;
    })
    return res.render('rewards', {data: {reward: newReward, employee: newEmployee}})
}

exports.postReward = async (req, res) => {   
    url = "http://localhost:5000/api/admin/reward";
    var cookie = get_cookies(req)["authcookie"];
    var {name, description, validFrom, expiryDate, userid} = req.body
    
    if(userid.length == 24)
    {userid = userid.split(" ");}

    var data = {
         name,
         description,
         validFrom,
         expiryDate,
         userid
        }
    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.post(url, data, {headers: headers}).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        //console.log(error)
        return error;
    })       
    return res.redirect('/rewards');
}

exports.putReward = async (req, res) => {   
    url = "http://localhost:5000/api/admin/reward";
    var cookie = get_cookies(req)["authcookie"];
    var {name, description, id} = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = {
         name,
         description,
         id
        }
    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        //console.log(error)
        return error;
    })       
    return res.redirect('/rewards');
}