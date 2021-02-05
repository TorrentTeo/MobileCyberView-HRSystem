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
            var reward = {
                name: reward[key].name,
                description: reward[key].description,
                namelist: reward[key].namelist,
                validFrom: new Date(reward[key].validFrom).toDateString(),
                expiryDate: new Date(reward[key].expiryDate).toDateString()             
            }
            newReward.push(reward)
        }
        
    }).catch((error) => {
        console.log(error)
        return error;
    })
           return res.render('rewards', {data: {reward: newReward}})

}