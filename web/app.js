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
const {getFeed, postFeed, putFeed} = require("./controllers/homeController")
const {getMedical, postClinic, postInsurance,
     postMedicalPlan, editplan,editclinic,editinsurance} = require("./controllers/medicalController")

const {getReward, postReward, putReward} = require("./controllers/rewardsController")

const {getAttendanceCode,getAttendance} = require("./controllers/attendanceController")
const {getEmployee, postPerformance, putPerformance, register, putUser} = require("./controllers/employeeController")
app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));


const {getCalendar,approveLeave,denyLeave,postActivities,editCalendar} = require("./controllers/calendarController")

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
app.use('/uploads', express.static(__dirname + 'public/uploads'))
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
app.post('/putfeed', auth ,putFeed);

app.get('/calendar', auth , getCalendar);
app.post('/editcalendar', editCalendar);
app.post('/activities', auth , postActivities);
app.post('/approveLeave', auth , approveLeave);
app.post('/denyLeave', auth , denyLeave);
//employee routes


app.get('/employee', getEmployee);
app.post('/employee', postPerformance);
app.post('/putPerformance', putPerformance);
app.post('/register', register);
app.post('/putUser', putUser);

//app.get('/employees', auth , getEmployeeData)

app.get('/attendance', auth , getAttendance)

app.get('/attendanceCode', auth , getAttendanceCode)

app.get('/benefit', (req, res) => {
    res.render('benefit')
})

app.get('/medical', auth, getMedical)
app.post('/postClinic', postClinic)
app.post('/postInsurance', postInsurance)
app.post('/postMedicalPlan', postMedicalPlan)
app.post('/editplan', editplan)
app.post('/editclinic', editclinic)
app.post('/editinsurance', editinsurance)

app.get('/contracts', getClientContracts)

app.get('/feedback', auth, getFeedback)

app.get('/rewards', auth, getReward)
app.post('/postReward', auth , postReward);
app.post('/putReward', auth , putReward);



//listen on port
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});