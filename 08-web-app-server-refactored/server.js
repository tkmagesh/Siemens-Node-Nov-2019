var http = require('http'),
    app = require('./app'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler');

app.use(dataParser); 
app.use(serveStatic); 
app.use(serveCalculator); 
app.use(notFoundHandler);

//console.log(req.method + '\t' + req.url);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function () {
    console.log('web app server listening on 8080!');
});