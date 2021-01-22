//import
const express = require('express')
const app = express()
const port = 3000
const router = express.Router()
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser')

const axios = require('axios')
const cookieParser = require('cookie-parser')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Static files

app.use(express.static('public'))
app.use("/", router);

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//Set Views

// app.use(cookieParser());
app.set('views', './web')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})



//GET
router.get('/destination', (req, res) => {
    res.render('destination', {output: "test"})
})

//POST
router.post('/login', (req, res) => {
    var {username, password} = req.body;
    console.log(req.body);
    if(!username || !password)
        res.render('login',{ error: true, message: "Username & password are required" })
    axios.post('http://localhost:5000/api/auth/login', {
    // auth: {    
        email: username,
        password: password
    // }
    }).then((response) => {
        console.log(`statusCode: ${response.statusCode}`)
        console.log(response)
    }).catch((error) => {
        console.error(error)
    })
    res.redirect('/destination');
})

// router.get('/destination', (req, res) => {
//     res.render('destination', {output: "test"});
// })


//listen on port
app.listen(port, () => console.info('Listening on port ' + port))