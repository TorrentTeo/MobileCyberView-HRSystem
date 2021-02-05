const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getEmployee = async (req, res) => {
    var newEmployeeData = [];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};
    console.log(headers)

    await axios.get("http://localhost:5000/api/admin/AllEmployee", {headers: headers} , data).then((response) => {
        var resData = response.data;
        var employeeResponse = resData.results.user;

        for (key in employeeResponse) {

         
                var user = {
                    name: employeeResponse[key].name,
                    email: employeeResponse[key].email,
                    contact: employeeResponse[key].contact,
                    emergencyContact: employeeResponse[key].emergencyContact,
                    joinedDate: new Date (employeeResponse[key].createdAt).toDateString()
                }
            
            
            newEmployeeData.push(user)
        }



    }).catch((error) => {
        console.log(error)
        return error;
    })
    var newProfileData = [];

    await axios.get("http://localhost:5000/api/admin/EmployeeProfile", {headers: headers} , data).then((response) => {
    var resData = response.data;
    var employeeProfile = resData.results.profile;

    for (key in employeeProfile) {

         
        var profile = {
            name: employeeProfile[key].name,
            category: employeeProfile[key].category,
            description: employeeProfile[key].description,
            date: new Date (employeeProfile[key].date).toDateString()
        }
    
    
        newProfileData.push(profile)
}

res.render('employee', {data: {employeeResponse: newEmployeeData, employeeProfile: newProfileData }} )


}).catch((error) => {
    console.log(error)
    return error;
})
}