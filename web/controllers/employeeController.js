const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getEmployee = async (req, res) => {
    var newEmployeeData = [];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    await axios.get("http://localhost:5000/api/admin/AllEmployee", {headers: headers} , data).then((response) => {
        var resData = response.data;
        var employeeResponse = resData.results.user;
        for (key in employeeResponse) {
                var user = {
                    name: employeeResponse[key].name,
                    email: employeeResponse[key].email,
                    contact: employeeResponse[key].contact,
                    emergencyContact: employeeResponse[key].emergencyContact,
                    joinedDate: new Date (employeeResponse[key].createdAt).toDateString(),
                    emergencyContact: employeeResponse[key].emergencyContact,
                    id: employeeResponse[key]._id,
                    verified: employeeResponse[key].verified,
                }          
            newEmployeeData.push(user)
        }
    }).catch((error) => {
        return res.render('employee', {error: true, message: error.message})
    })
    var newProfileData = [];

    await axios.get("http://localhost:5000/api/admin/allEmployeeProfile", {headers: headers} , data).then((response) => {
    var resData = response.data;
    var employeeProfile = resData.results.profile;
    for (key in employeeProfile) {    
        var profile = {
            name: employeeProfile[key].name,
            category: employeeProfile[key].category,
            description: employeeProfile[key].description,
            date: new Date (employeeProfile[key].date).toDateString(),
            writtenBy: employeeProfile[key].writtenBy,
            id: employeeProfile[key]._id
        }
        newProfileData.push(profile)
}


}).catch((error) => {
    return res.render('employee', {error: true, message: error.message})
})
var newEmployee = [];
    await axios.get("http://localhost:5000/api/admin/AllEmployee", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var employee = resData.results.user;
        for(key in employee){
            var employees = {
                name: employee[key].name,
                email: employee[key].email,
                contact: employee[key].contact,
                _id: employee[key]._id
            }
            newEmployee.push(employees)
        }
        
    }).catch((error) => {
        return res.render('employee', {error: true, message: error.message})
    })
    res.render('employee',{success: true, message: "Success",data: {employee: newEmployee, employeeResponse: newEmployeeData, employeeProfile: newProfileData }} )

}

exports.postPerformance = async (req, res) => {   
    url = "http://localhost:5000/api/employee/profile";
    var cookie = get_cookies(req)["authcookie"];
    var { category, description, date, toWho } = req.body
    
    //if(userid.length == 24)
    //{userid = userid.split(" ");}

    var data = { 
        category,
        description, 
        date,
        toWho 
    }
    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.post(url, data, {headers: headers}).then((response) => {
        return res.redirect('/employee');
    }).catch((error) => {

        return res.render('employee', {error: true, message: error.message})
    })       
}
exports.putPerformance = async (req, res) => {   
    url = "http://localhost:5000/api/employee/profile";
    var cookie = get_cookies(req)["authcookie"];
    var {id,category,description} = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = {
        category,
        description,
         id
        }

    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/employee');
    }).catch((error) => {
        return res.render('employee', {error: true, message: error.message})
    })       
}
exports.register = async (req, res) => {   
    url = "http://localhost:5000/api/auth/register";
    var cookie = get_cookies(req)["authcookie"];
    var {name,email,password,role,contact,emergencyContact} = req.body
    
    //if(userid.length == 24)
    //{userid = userid.split(" ");}

    var data = {
        name,
        email,
        password,
        role,
        contact,
        emergencyContact,
    }

    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.post(url, data, {headers: headers}).then((response) => {
        return res.redirect('/employee');
    }).catch((error) => {
        return res.render('employee', {error: true, message: error.message})
    })       

}
exports.putUser = async (req, res) => {   
    url = "http://localhost:5000/api/employee/account";
    var cookie = get_cookies(req)["authcookie"];
    var {id, email,contact,emergencyContact} = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = {
        id,
        email,
        contact,
        emergencyContact
    }
    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/employee');
    }).catch((error) => {
        return res.render('employee', {error: true, message: error.message})
    })       
   
}