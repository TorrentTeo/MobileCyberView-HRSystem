const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getlogin = (req, res) => {
    res.render('login')
};

exports.postlogin = (req, res) => {
    var { username, pass } = req.body;
    if(!username || !pass)
        res.render('login',{ error: true, message: "Username & password are required" })
    axios.post('https://cyber-view-api.herokuapp.com/api/auth/login', {
        email: username,
        password: pass
    }).then((response) => {
        console.log(`statusCode: ${response.data.code}`)
        console.log(response.data)
        var resData = response.data;
        // token from response
        var token = resData.results.token;
        // set session
        var sess = req.session;
        // set session variable
        sess.email= resData.results.user.email;
        sess.role = resData.results.user.role;
        sess.name = resData.results.user.name;
        sess.uid = resData.results.user.id;
        // set token on cookie
        res.cookie('authcookie',token,{ maxAge: 2 * 60 * 60 * 1000, httpOnly: true }) 
        res.redirect('/home');
    }).catch((error) => {
        res.render('login', {error:true, message:error.message});
    })
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.auth = async (req,res, next) => {
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/Attendance", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        console.log(resData)
        if(response.data.message == 'Unauthorized'){
            res.render('login', {error:true, message: "Unauthorized"});
        }
        next();
    }).catch((error) => {

        res.render('login', {error:true, message: "Unauthorized"});
    })
}