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
                valid: reward[key].valid            
            }
            newReward.push(rewards)
        }
        
    }).catch((error) => {
        console.log(error)
        return error;
    })
           return res.render('rewards', {data: {reward: newReward}})

}

exports.postReward = async (req, res) => {   
    url = "http://localhost:5000/api/admin/reward";
    var {name, description, validFrom, expiryDate, userid}=  req.body
    var data = {
         name: name, 
         description: description, 
         validFrom: validFrom,
         expiryDate: expiryDate,
         userid: userid
        } 
    console.log(data)
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.post(url, data, {headers: headers}).then((response) => {
        var resData = response.data;
        console.log(resData)
    }).catch((error) => {
        console.log(error)
        return error;
    })       
    return res.redirect('/rewards');
}