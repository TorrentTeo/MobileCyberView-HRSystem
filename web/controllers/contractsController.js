const axios = require('axios')
const {get_cookies} = require("../common/cookieHelper")
const {daysBetween} = require("../common/dateHelper")

exports.getClientContracts = async (req, res) => {
    var cookie = get_cookies(req)["authcookie"];
    var data = req.body;
    var headers = {Authorization: "Bearer " + get_cookies(req)["authcookie"]};

    var newContracts = [];
    await axios.get("http://localhost:5000/api/admin/allclientcontract", {headers: headers} ,data).then((response) => {
        var resData = response.data;
        var contracts = resData.results.contracts;
        console.log(contracts)
        for(key in contracts){
            // var days = datediff(parseDate(new Date(leaveRequests[key].from).toDateString()), parseDate(new Date(leaveRequests[key].to).toDateString()));
            var contract = {
                contractid: key,
                title: contracts[key].title,
                terms: contracts[key].terms,
                parties: contracts[key].parties
            }
            newContracts.push(contract)
        }
        return res.render('contracts', {data: {contracts: newContracts}})
    }).catch((error) => {
        console.log(error)
        return error;
    })    
}