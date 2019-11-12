var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
        end();
    }
    var queryData = querystring.parse(urlObj.query),
        x = parseInt(queryData.x),
        y = parseInt(queryData.y),
        op = queryData.op,
        result = calculator[op](x,y);

        res.write(result.toString());
        res.end();
});

server.listen(8080);

server.on('listening', function(){
    console.log('app server listening on 8080!');
});