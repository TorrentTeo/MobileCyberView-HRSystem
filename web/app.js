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
const {getlogin, postlogin,logout, auth} = require("./controllers/loginController")
const {getFeed, postFeed} = require("./controllers/homeController")
const {getMedical} = require("./controllers/medicalController")
const {getCalendar,approveLeave,denyLeave,postActivities} = require("./controllers/calendarController")
const {getAttendanceCode,getAttendance} = require("./controllers/attendanceController")
const {getClientContracts} = require("./controllers/contractsController")
const {getFeedback} = require("./controllers/feedbackController")
app.use(session({name:'some_session',secret: 'lalala',resave: true,saveUninitialized: false,cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 ,httpOnly: false}}));
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

app.get('/logout', logout);

//home routes
app.get('/home', auth , getFeed);
app.post('/home', auth ,postFeed);


app.get('/calendar', auth , getCalendar);
app.post('/activities', auth , postActivities);
app.post('/approveLeave', auth , approveLeave);
app.post('/denyLeave', auth , denyLeave);
//employee routes
app.get('/employee', (req, res) => {
    res.render('employee')
})

app.get('/attendance', auth , getAttendance)

app.get('/attendanceCode', auth , getAttendanceCode)

app.get('/benefit', (req, res) => {
    res.render('benefit')
})

app.get('/medical', getMedical)


app.get('/contracts', getClientContracts)

app.get('/feedback', auth, getFeedback)

app.get('/rewards', (req, res) => {
    res.render('rewards')
})


//listen on port
app.listen(port, () => console.info('Listening on port ' + port))