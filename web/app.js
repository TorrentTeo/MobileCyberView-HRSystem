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
app.set('views', './web')
app.set('view engine', 'ejs')

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

//listen on port
app.listen(port, () => console.info('Listening on port ' + port))