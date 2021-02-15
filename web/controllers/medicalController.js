const axios = require('axios')
const { get_cookies } = require("../common/cookieHelper")
var fs = require("fs");
const path = require("path")
var formidable = require("formidable");

exports.getMedical = async (req, res) => {
    var url = "https://cyber-view-api.herokuapp.com/api/admin/allMedicalPlan";
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
                name: medicalPlan[key].name,
                id: medicalPlan[key]._id
            }
            newMedicalPlan.push(plan)
        }

    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })

    var newMedicalLeave = [];
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/allmedicalLeave", { headers: headers }, data).then((response) => {

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
        return res.render('medical', {error: true, message: error.message})
    })

    var newClinicList = [];
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/allClinicList", { headers: headers }, data).then((response) => {

        var resData = response.data;
        var clinicList = resData.results.clinicList;
        for (key in clinicList) {
            var clinic = {
                clinicName: clinicList[key].clinicName,
                latitude: clinicList[key].latitude,
                longitude: clinicList[key].longitude,
                name: clinicList[key].name,
                id: clinicList[key]._id
            }
            newClinicList.push(clinic)
        }
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })

    var newInsuranceCoverage = [];
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/allinsurancecoverage", { headers: headers }, data).then((response) => {

        var resData = response.data;
        var insuranceCoverage = resData.results.insurance;
        for (key in insuranceCoverage) {
            var insurance = {
                typeofInsurance: insuranceCoverage[key].typeofInsurance,
                description: insuranceCoverage[key].description,
                contactPerson: insuranceCoverage[key].contactPerson,
                contactNumber: insuranceCoverage[key].contactNumber,
                name: insuranceCoverage[key].name,
                id: insuranceCoverage[key]._id
            }
            newInsuranceCoverage.push(insurance)
        }
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })

    var newEmployee = [];
    await axios.get("https://cyber-view-api.herokuapp.com/api/admin/AllEmployee", { headers: headers }, data).then((response) => {
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
        return res.render('medical', {error: true, message: error.message})
    })
    return res.render('medical', {success: true, message: "Success", data: { employee: newEmployee, medicalPlan: newMedicalPlan, medicalLeave: newMedicalLeave, clinicList: newClinicList, insuranceCoverage: newInsuranceCoverage } })

}

exports.postMedicalPlan = async (req, res) => {
    url = "https://cyber-view-api.herokuapp.com/api/admin/medicalPlan";
    var cookie = get_cookies(req)["authcookie"];
    var formData = new formidable.IncomingForm();
    var data = {}
    var userid;
    formData.parse(req, async (error, fields, files) => {
        if (fields.userid.length == 24) { userid = fields.userid.split(" "); }
        // console.log(files.medicalCardFront.name)
        var extension = files.medicalCardFront.name.substr(files.medicalCardFront.name.lastIndexOf("."));
        var num = Math.floor(Math.random() * 3) + 1

        switch(num){
            case 1:
                var medicalCardFrontPath = "./public/uploads/1200px-Tessera_Sanitaria_Italia-Fronte.jpg-1613336689281.jpg"
                var medicalCardBackPath = "./public/uploads/1200px-Tessera_Sanitaria_Italia-Fronte.jpg-1613336689281.jpg"
                break;
            case 2:
                var medicalCardFrontPath = "./public/uploads/ID-front-EN.png"
                var medicalCardBackPath = "./public/uploads/discover-it-cash-back_qZc7GjN.png"
                break;
            default:
                var medicalCardFrontPath = "./public/uploads/ID-front-EN.png"
                var medicalCardBackPath = "./public/uploads/images.png"
                break;
        }



        // var medicalCardFrontPath = "./public/uploads/" + files.medicalCardFront.name + "-" + Date.now() + extension;
        // fs.rename(files.medicalCardFront.path, medicalCardFrontPath, async (errorRename) => {
        //     if (errorRename)
        //         return res.render('medical', {error: true, message: errorRename.message});
        // });

        // var extension = files.medicalCardBack.name.substr(files.medicalCardBack.name.lastIndexOf("."));


        // var medicalCardBackPath = "./public/uploads/" + files.medicalCardBack.name + "-" + Date.now() + extension;
        // fs.rename(files.medicalCardBack.path, medicalCardBackPath, async (errorRename) => {
        //     if (errorRename)
        //         return res.render('medical', {error: true, message: errorRename.message});
        // });

        data = {
            medicalPlanName: fields.medicalPlanName,
            medicalCardFront: medicalCardFrontPath.replace('./public',''),
            medicalCardBack: medicalCardBackPath.replace('./public',''),
            userid: fields.userid.split(" ")
        }
  
            var headers = { Authorization: "Bearer " + cookie };
            await axios.post(url, data, { headers: headers }).then((response) => {
                return res.redirect('/medical');
            }).catch((error) => {

                return res.render('medical', {error: true, message: error.message});
            })
    });
    
}


exports.postClinic = async (req, res) => {
    url = "https://cyber-view-api.herokuapp.com/api/admin/clinicList";
    var cookie = get_cookies(req)["authcookie"];
    var { clinicName, longitude, latitude, userid } = req.body

    if (userid.length == 24) { userid = userid.split(" "); }

    var data = {
        clinicName,
        longitude,
        latitude,
        userid
    }

    var headers = { Authorization: "Bearer " + cookie };
    await axios.post(url, data, { headers: headers }).then((response) => {
        return res.redirect('/medical');
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })
    
}

exports.postInsurance = async (req, res) => {
    url = "https://cyber-view-api.herokuapp.com/api/admin/insuranceCoverage";
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
    var headers = { Authorization: "Bearer " + cookie };
    await axios.post(url, data, { headers: headers }).then((response) => {
        return res.redirect('/medical');
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })
    
}
exports.editplan = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/medicalPlan";
    var cookie = get_cookies(req)["authcookie"];
    var { id, medicalPlanName} = req.body

    if(id.length == 24)
    {id = id.split(" ");}
    var num = Math.floor(Math.random() * 3) + 1

    switch(num){
        case 1:
            var medicalCardFrontPath = "./public/uploads/1200px-Tessera_Sanitaria_Italia-Fronte.jpg-1613336689281.jpg"
            var medicalCardBackPath = "./public/uploads/1200px-Tessera_Sanitaria_Italia-Fronte.jpg-1613336689281.jpg"
            break;
        case 2:
            var medicalCardFrontPath = "./public/uploads/ID-front-EN.png"
            var medicalCardBackPath = "./public/uploads/discover-it-cash-back_qZc7GjN.png"
            break;
        default:
            var medicalCardFrontPath = "./public/uploads/ID-front-EN.png"
            var medicalCardBackPath = "./public/uploads/images.png"
            break;
    }

    data = {
        medicalPlanName: medicalPlanName,
        medicalCardFront: medicalCardFrontPath.replace('./public',''),
        medicalCardBack: medicalCardBackPath.replace('./public',''),
        id: id.split(" ")
    }
    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/medical');
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })       

}
exports.editclinic = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/clinicList";
    var cookie = get_cookies(req)["authcookie"];
    var { id,clinicName,longitude,latitude } = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = { id,clinicName,longitude,latitude }

    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/medical');
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })       

}
exports.editinsurance = async (req, res) => {   
    url = "https://cyber-view-api.herokuapp.com/api/admin/insuranceCoverage";
    var cookie = get_cookies(req)["authcookie"];
    var { id,typeofInsurance,description,contactPerson,contactNumber } = req.body
    
    if(id.length == 24)
    {id = id.split(" ");}

    var data = { id,typeofInsurance,description,contactPerson,contactNumber }
    console.log(data)
    var headers = {Authorization: "Bearer " + cookie};
    await axios.put(url, data, {headers: headers}).then((response) => {
        return res.redirect('/medical');
    }).catch((error) => {
        return res.render('medical', {error: true, message: error.message})
    })       
    
}
