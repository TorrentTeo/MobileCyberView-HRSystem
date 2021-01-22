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
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use("/", router);

app.use(cookieParser());
app.set('views', './web')
app.set('view engine', 'ejs')

router.get('', (req, res) => {
    res.render('index')
})

router.get('/login', (req, res) => {
    res.render('login')
})

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
        var token = resData.results.token;
        var sess = req.session;
        sess.email= resData.results.user.email;
        sess.role = resData.results.user.role;
        sess.name = resData.results.user.name;
        sess.uid = resData.results.user.id;
        res.cookie('authcookie',token,{maxAge:900000,httpOnly:true})      
        res.redirect('/dashboard');
    }).catch((error) => {
        console.log("error")
        console.error(error)
        res.render('login')
    })
});

router.get('/dashboard', (req, res) => {
    var sess = req.session;
    res.render('dashboard', {output: {email: sess.email, name: sess.name, role: sess.role, id: sess.uid}});
})
//listen on port
app.listen(port, () => console.info('Listening on port ' + port))



