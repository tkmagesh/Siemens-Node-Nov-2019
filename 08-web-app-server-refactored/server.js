var http = require('http'),
    path = require('path'),
    app = require('./app'),
    dataParser = require('./dataParser'),
    serveStatic = require('./serveStatic'),
    serveCalculator = require('./serveCalculator'),
    notFoundHandler = require('./notFoundHandler'),
    logger = require('./logger');

app.use(dataParser); 
app.use(logger);
app.use(serveStatic(path.join(__dirname, 'public'))); 
app.use(serveCalculator); 
app.use(notFoundHandler);

var server = http.createServer(app);

server.listen(8080);

server.on('listening', function () {
    console.log('web app server listening on 8080!');
});