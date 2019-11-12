var http = require('http');
/* 
    req - http.IncomingMessage -> ReadableStream
    res - http.ServerResponse -> WritableStream
*/
var server = http.createServer(function(req, res){
    res.write('<h1>Welcome to Node.js</h1>');
    res.end();
});

server.listen(8080);

server.on('listening', function(){
    console.log('server listening on 8080!');
});