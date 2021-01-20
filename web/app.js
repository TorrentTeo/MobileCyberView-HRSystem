//import
const express = require('express')
const app = express()
const port = 3000
const axios = require('axios')
const router = express.Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

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
        console.log(`statusCode: ${response.statusCode}`)
        console.log(response)
    }).catch((error) => {
        console.error(error)
    })
    res.redirect('/dashboard');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard', {output: "test"});
})
//listen on port
app.listen(port, () => console.info('Listening on port ' + port))



