//import
const express = require('express')
const session = require('express-session');

const app = express()
const port = 3000


const axios = require('axios')
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uuid = require('uuid');
const {httpPost} = require("./helpers/HttpRequestHelper")

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Static files
app.use(express.static('public'))
app.use("/", router);

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(cookieParser());

//Set Views
app.set('views', './')
app.set('view engine', 'ejs')

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/home', (req, res) => {
    res.render('home')
})

app.get('/employee', (req, res) => {
    res.render('employee')
})

app.get('/attendance', (req, res) => {
    res.render('attendance')
})

app.get('/benefit', (req, res) => {
    res.render('benefit')
})

app.get('/calendar', (req, res) => {
    res.render('calendar')
})

app.get('/medical', (req, res) => {
    res.render('medical')
})

app.get('/contracts', (req, res) => {
    res.render('contracts')
})

app.get('/feedback', (req, res) => {
    res.render('feedback')
})

app.get('/rewards', (req, res) => {
    res.render('rewards')
})


//POST
router.post('/login', (req, res) => {
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
});

//GET
router.get('/home', (req, res) => {
    var sess = req.session;
    res.render('home', { output: { email: sess.email, name: sess.name, role: sess.role, id: sess.uid}});
})


//use this method to get cookies 
//example:  var cookie = get_cookies(req)["COOKIE_NAME HERE"]
var get_cookies = function(request) {
    var cookies = {};
    request.headers && request.headers.cookie.split(';').forEach(function(cookie) {
      var parts = cookie.match(/(.*?)=(.*)$/)
      cookies[ parts[1].trim() ] = (parts[2] || '').trim();
    });
    return cookies;
  };
//listen on port
app.listen(port, () => console.info('Listening on port ' + port))