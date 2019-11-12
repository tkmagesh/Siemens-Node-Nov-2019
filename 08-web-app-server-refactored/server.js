var http = require('http'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler');

var server = http.createServer(function (req, res) {
    console.log(req.method + '\t' + req.url);
    dataParser(req);
    serveStatic(req, res);
    serveCalculator(req, res);
    notFoundHandler(res);    
});

server.listen(8080);

server.on('listening', function () {
    console.log('web app server listening on 8080!');
});