const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getFeed = async (req, res) => {
    var url = "https://cyber-view-api.herokuapp.com/api/admin/allFeed";
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + cookie};

    var newFeed = [];
    await axios.get(url, {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var feed = resData.results.feed;
        for(key in feed){
            var feeds = {
                feedType: feed[key].feedType,
                content: feed[key].content,
                createdAt: new Date(feed[key].createdAt).toDateString(),
                namelist: feed[key].namelist,
                id: feed[key]._id            
            }
            newFeed.push(feeds)
        }
        
    }).catch((error) => {
        return res.render('home', {error: true, message: error.message})
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
        return res.render('home', {error: true, message: error.message})
    })
    return res.render('home', {data: {feed: newFeed, employee: newEmployee}})
}

exports.postFeed = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/feed";
    var cookie = get_cookies(req)["authcookie"];
    var {feedType,content,userid,} = req.body
    
    if(userid.length == 24)
    {userid = userid.split(" ");}

    var data = {
        feedType,
        content,
        userid,
    }

    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.post(url, data, {headers: headers}).then((response) => {
    }).catch((error) => {
        //console.log(error)
        return error;
    })       
    return res.redirect('/home');
}

exports.putFeed = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/feed";
    var cookie = get_cookies(req)["authcookie"];
    var { content, id} = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = {
        content,
         id
        }
    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        return res.render('home', {error: true, message: error.message})
    })       
    return res.redirect('/home');
}