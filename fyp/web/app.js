var url = require('url');
var fs = require('fs');

function renderHTML(path, res){
    fs.readFile(path, null, function(error, data){
        if (error){
            res.writeHead(404)
            res.writeHead('Error: File Not Found')
        } else {
            res.write(data)
        }
        res.end();
    });
}

module.exports = {                                              //export functions
    handleReq: function(req, res) {
        res.writeHead(200, { 'Content-Type': 'text/html' });    //content will read html codes 

        var path = url.parse(req.url).pathname;
        switch (path){
            case '/':
                renderHTML('./index.html', res); //it will display the index page
                break;
            case '/login':
                renderHTML('./login.html', res); //it will display the login page when /login is added on url
                break;
            default:
                res.writeHead(404);
                res.write('Route not defined');         //it will display error message when the page is not found
                res.end();                              //end response

        }

    }
}