const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")

exports.getMedical = async (req, res) => {
    var url = "http://localhost:5000/api/admin/allMedicalPlan";
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + cookie};

    var newMedicalPlan = [];
    await axios.get(url, {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var medicalPlan = resData.results.medicalPlan;
        for(key in medicalPlan){
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
    await axios.get("http://localhost:5000/api/admin/allmedicalLeave", {headers: headers} ,data).then((response) => {
    
        var resData = response.data;
        var medicalLeave = resData.results.leave;
        
        for(key in medicalLeave){
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
    await axios.get("http://localhost:5000/api/admin/allClinicList", {headers: headers} ,data).then((response) => {
    
        var resData = response.data;
        var clinicList = resData.results.clinicList;        
        for(key in clinicList){
            var clinic = {
                clinicName: clinicList[key].clinicName,
                location: clinicList[key].location,
                name: clinicList[key].name
            }
            newClinicList.push(clinic)
        }
    }).catch((error) => {
        console.log(error)
        return error;
    })

    var newInsuranceCoverage = [];
    await axios.get("http://localhost:5000/api/admin/allinsurancecoverage", {headers: headers} ,data).then((response) => {
    
        var resData = response.data;
        var insuranceCoverage = resData.results.insurance;        
        for(key in insuranceCoverage){
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
       return res.render('medical', {data: {medicalPlan: newMedicalPlan, medicalLeave: newMedicalLeave, clinicList: newClinicList, insuranceCoverage: newInsuranceCoverage}})

}