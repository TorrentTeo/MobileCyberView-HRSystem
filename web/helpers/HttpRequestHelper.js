const axios = require('axios')


exports.httpPost = function (url, body){
    axios.post(url, {
        body
    }).then((response) => {
        console.log(`statusCode: ${response.data.code}`)
        console.log(response.data)
        var resData = response.data;
        return resData;
    }).catch((error) => {
        console.log(error)
        return error;
    })
}