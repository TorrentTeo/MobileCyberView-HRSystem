const axios = require('axios')

exports.getlogin = (req, res) => {
    res.render('login')
};

exports.postlogin = (req, res) => {
    var { username, pass } = req.body;
    if(!username || !pass)
        res.render('login',{ error: true, message: "Username & password are required" })
    axios.post('http://localhost:5000/api/auth/login', {
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
        res.cookie('authcookie',token,{maxAge:900000,httpOnly:true}) 
        res.redirect('/home');
    }).catch((error) => {
        console.log("error")
        console.error(error)
        res.render('login')
    })
};