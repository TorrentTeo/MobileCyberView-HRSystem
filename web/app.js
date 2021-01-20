//import
const express = require('express')
const app = express()
const port = 3000
const router = express.Router()
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
// const connect = require("connect");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Static files

app.use(express.static('public'))
app.use("/", router);

app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

//Set Views
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
    res.redirect('/destination');
})


//listen on port
app.listen(port, () => console.info('Listening on port ' + port))