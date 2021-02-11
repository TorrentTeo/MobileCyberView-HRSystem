const axios = require('axios')
const { get_cookies } = require("../common/cookieHelper")
var fs = require("fs");
const path = require("path")
var formidable = require("formidable");


// var storage = multer.diskStorage({ 
//     destination: function (req, file, cb) {  
//         // Uploads is the Upload_folder_name 
//         cb(null, "./publoc/uploads") 
//     }, 
//     filename: function (req, file, cb) { 
//       cb(null, file.fieldname + "-" + Date.now()+
//       path.extname(file.originalname)) 
//     } 
// });

// var upload = multer({ storage: storage });
exports.getMedical = async (req, res) => {
    var url = "http://localhost:5000/api/admin/allMedicalPlan";
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = { Authorization: "Bearer " + cookie };

    var newMedicalPlan = [];
    await axios.get(url, { headers: headers }, data).then((response) => {
        var resData = response.data;
        var medicalPlan = resData.results.medicalPlan;
        for (key in medicalPlan) {
            var plan = {
                medicalPlanName: medicalPlan[key].medicalPlanName,
                medicalCardFront: medicalPlan[key].medicalCardFront,
                medicalCardBack: medicalPlan[key].medicalCardBack,
                name: medicalPlan[key].name
            }
            newMedicalPlan.push(plan)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newMedicalLeave = [];
    await axios.get("http://localhost:5000/api/admin/allmedicalLeave", { headers: headers }, data).then((response) => {

        var resData = response.data;
        var medicalLeave = resData.results.leave;

        for (key in medicalLeave) {
            var leave = {
                name: medicalLeave[key].name,
                reason: medicalLeave[key].reason,
                date: new Date(medicalLeave[key].from).toDateString() + ' - ' + new Date(medicalLeave[key].to).toDateString()

            }
            newMedicalLeave.push(leave)
        }
    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newClinicList = [];
    await axios.get("http://localhost:5000/api/admin/allClinicList", { headers: headers }, data).then((response) => {

        var resData = response.data;
        var clinicList = resData.results.clinicList;
        for (key in clinicList) {
            var clinic = {
                clinicName: clinicList[key].clinicName,
                latitude: clinicList[key].latitude,
                longitude: clinicList[key].longitude,
                name: clinicList[key].name
            }
            newClinicList.push(clinic)
        }
    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newInsuranceCoverage = [];
    await axios.get("http://localhost:5000/api/admin/allinsurancecoverage", { headers: headers }, data).then((response) => {

        var resData = response.data;
        var insuranceCoverage = resData.results.insurance;
        for (key in insuranceCoverage) {
            var insurance = {
                typeofInsurance: insuranceCoverage[key].typeofInsurance,
                description: insuranceCoverage[key].description,
                contactPerson: insuranceCoverage[key].contactPerson,
                contactNumber: insuranceCoverage[key].contactNumber,
                name: insuranceCoverage[key].name
            }
            newInsuranceCoverage.push(insurance)
        }
    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newEmployee = [];
    await axios.get("http://localhost:5000/api/admin/AllEmployee", { headers: headers }, data).then((response) => {
        var resData = response.data;
        var employee = resData.results.user;
        for (key in employee) {
            var employees = {
                name: employee[key].name,
                email: employee[key].email,
                contact: employee[key].contact,
                _id: employee[key]._id
            }
            newEmployee.push(employees)
        }

    }).catch((error) => {
        console.log(error)
        return error;
    })
    return res.render('medical', { data: { employee: newEmployee, medicalPlan: newMedicalPlan, medicalLeave: newMedicalLeave, clinicList: newClinicList, insuranceCoverage: newInsuranceCoverage } })

}

exports.postMedicalPlan = async (req, res) => {
    url = "http://localhost:5000/api/admin/medicalPlan";
    var cookie = get_cookies(req)["authcookie"];
    var formData = new formidable.IncomingForm();
    var data = {}
    var userid;
    formData.parse(req, async (error, fields, files) => {
        if (fields.userid.length == 24) { userid = fields.userid.split(" "); }
        console.log(files.medicalCardFront.name)
        var extension = files.medicalCardFront.name.substr(files.medicalCardFront.name.lastIndexOf("."));
        var medicalCardFrontPath = "./public/uploads/" + files.medicalCardFront.name + "-" + Date.now() + extension;
        fs.rename(files.medicalCardFront.path, medicalCardFrontPath, async (errorRename) => {
            if (errorRename)
                console.log(errorRename)
        });

        var extension = files.medicalCardBack.name.substr(files.medicalCardBack.name.lastIndexOf("."));
        var medicalCardBackPath = "./public/uploads/" + files.medicalCardBack.name + "-" + Date.now() + extension;
        fs.rename(files.medicalCardBack.path, medicalCardBackPath, async (errorRename) => {
            if (errorRename)
                console.log(errorRename)
        });
        console.log(data)
        data = {
            medicalPlanName: fields.medicalPlanName,
            medicalCardFront: medicalCardFrontPath.replace('./public',''),
            medicalCardBack: medicalCardBackPath.replace('./public',''),
            userid: fields.userid.split(" ")
        }
        console.log(data)
            var headers = { Authorization: "Bearer " + cookie };
            await axios.post(url, data, { headers: headers }).then((response) => {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
                return error;
            })
    });
    return res.redirect('/medical');
}


exports.postClinic = async (req, res) => {
    url = "http://localhost:5000/api/admin/clinicList";
    var cookie = get_cookies(req)["authcookie"];
    var { clinicName, longitude, latitude, userid } = req.body

    if (userid.length == 24) { userid = userid.split(" "); }

    var data = {
        clinicName,
        longitude,
        latitude,
        userid
    }
    console.log(data)
    var headers = { Authorization: "Bearer " + cookie };
    await axios.post(url, data, { headers: headers }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
        return error;
    })
    return res.redirect('/medical');
}

exports.postInsurance = async (req, res) => {
    url = "http://localhost:5000/api/admin/insuranceCoverage";
    var cookie = get_cookies(req)["authcookie"];
    var { typeofInsurance, description, contactPerson, contactNumber, userid } = req.body

    if (userid.length == 24) { userid = userid.split(" "); }

    var data = {
        typeofInsurance,
        description,
        contactPerson,
        contactNumber,
        userid
    }
    console.log(data)
    var headers = { Authorization: "Bearer " + cookie };
    await axios.post(url, data, { headers: headers }).then((response) => {
        console.log(response.data)
    }).catch((error) => {
        console.log(error)
        return error;
    })
    return res.redirect('/medical');
}
