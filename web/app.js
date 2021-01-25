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

=======
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
        //login success redirect to dashboard     
        res.redirect('/dashboard');
    }).catch((error) => {
        console.log("error")
        console.error(error)
        res.render('login')
    })
});

//GET
router.get('/dashboard', (req, res) => {
    var sess = req.session;
    res.render('dashboard', { output: { email: sess.email, name: sess.name, role: sess.role, id: sess.uid}});
})

//listen on port
app.listen(port, () => console.info('Listening on port ' + port))