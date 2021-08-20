var http = require('http');
var fs = require('fs');
var url = require('url');

port = 8080;

http.createServer(function(req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    var t = 'html';
    var notExist = false;
    console.log(filename);

    if(filename == './') {
        filename = './index.html';
    } else if (filename == './exam1.json') {
        t = 'json';
    } else {
        notExist = true;
    }

    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
    
    fs.readFile(filename, function(err, data){
        if(err || notExist){
            res.writeHead(404, {'Content-Type': `text/${t}`});
            return res.end('404 Not Found');
        }
        res.writeHead(200, {'Content-Type': `text/${t}`});
       
        res.write(data);
        return res.end();
    });
}).listen(port);

console.log(`Server Listening on port ${port}.`);