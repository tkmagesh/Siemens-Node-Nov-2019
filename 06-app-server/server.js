var http = require('http'),
    url = require('url'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url);
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
    }
    if (req.method === 'GET'){
        var queryData = querystring.parse(urlObj.query),
            x = parseInt(queryData.x),
            y = parseInt(queryData.y),
            op = queryData.op,
            result = calculator[op](x,y);

            res.write(result.toString());
            res.end();
    } else {
        var rawData = '';
        req.on('data', function(chunk){
            rawData += chunk;
        });
        req.on('end', function(){
            var bodyData = querystring.parse(rawData),
                x = parseInt(bodyData.x),
                y = parseInt(bodyData.y),
                op = bodyData.op,
                result = calculator[op](x,y);
            res.write(result.toString());
            res.end();
        });
    }
});

server.listen(9090);

server.on('listening', function(){
    console.log('app server listening on 9090!');
});