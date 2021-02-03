//import
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const axios = require('axios')
const app = express()
const port = 3000

const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const uuid = require('uuid');
const {getlogin, postlogin} = require("./controllers/loginController")
const {getFeed, postFeed} = require("./controllers/homeController")
const {getCalendar,approveLeave,denyLeave} = require("./controllers/calendarController")
const {getAttendanceCode,getAttendance} = require("./controllers/attendanceController")
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.use(cookieParser());
app.use(expressLayouts)
app.set('view engine', 'ejs')

//login 
app.get('/', getlogin);
app.post('/login', postlogin);

//home routes
app.get('/home', getFeed);
app.post('/home', postFeed);


app.get('/calendar', getCalendar);
app.post('/approveLeave', approveLeave);
app.post('/denyLeave', denyLeave);
//employee routes
app.get('/employee', (req, res) => {
    res.render('employee')
})

app.get('/attendance', getAttendance)

app.get('/attendanceCode', getAttendanceCode)

app.get('/benefit', (req, res) => {
    res.render('benefit')
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


//listen on port
app.listen(port, () => console.info('Listening on port ' + port))