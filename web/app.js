//import
const express = require('express')
const app = express()
const port = 3000


//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

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

//listen on port
app.listen(port, () => console.info('Listening on port ' + port))