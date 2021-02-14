const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getReward = async (req, res) => {
    var url = "https://cyber-view-api.herokuapp.com/api/admin/allReward";
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
        return res.render('rewards', {error: true, message: error.message})
    })

    var newEmployee = [];
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/AllEmployee", {headers: headers} ,data).then((response) => {
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
        return res.render('rewards', {error: true, message: error.message})
    })
    return res.render('rewards', {success: true, message: "Success",  data: {reward: newReward, employee: newEmployee}})
}

exports.postReward = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/reward";
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
    var headers = {Authorization: "Bearer " + cookie};
    await axios.post(url, data, {headers: headers}).then((response) => {
        return res.redirect('/rewards');
    }).catch((error) => {
        //console.log(error)
        return res.render('rewards', {error: true, message: error.message})
    })       

}

exports.putReward = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/reward";
    var cookie = get_cookies(req)["authcookie"];
    var {name, description, id} = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = {
         name,
         description,
         id
        }

    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/rewards');
    }).catch((error) => {
        //console.log(error)
        return res.render('rewards', {error: true, message: error.message})
    })       
    
}