var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    url = require('url');
    querystring = require('querystring'),
    calculator = require('./calculator');

var staticExtns = [ '.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico'];

function isStatic(resourceName){
    return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

var server = http.createServer(function (req, res) {
    console.log(req.method + '\t' + req.url);
    var urlObj = url.parse(req.url);
    var resourceName = urlObj.pathname === '/' ? 'index.html' : urlObj.pathname;
    if (isStatic(resourceName)){
        var resourcePath = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourcePath)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        fs.createReadStream(resourcePath).pipe(res);
    } else if (resourceName === '/calculator'){
        if (req.method === 'GET') {
            var queryData = querystring.parse(urlObj.query),
                x = parseInt(queryData.x),
                y = parseInt(queryData.y),
                op = queryData.op,
                result = calculator[op](x, y);

            res.write(result.toString());
            res.end();
        } else {
            var rawData = '';
            req.on('data', function (chunk) {
                rawData += chunk;
            });
            req.on('end', function () {
                var bodyData = querystring.parse(rawData),
                    x = parseInt(bodyData.x),
                    y = parseInt(bodyData.y),
                    op = bodyData.op,
                    result = calculator[op](x, y);
                res.write(result.toString());
                res.end();
            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function () {
    console.log('web app server listening on 8080!');
});