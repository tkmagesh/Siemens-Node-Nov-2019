var querystring = require('querystring'),
    calculator = require('./calculator');

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname;
    if (resourceName === '/calculator') {
        if (req.method === 'GET') {
            var queryData = querystring.parse(req.urlObj.query),
                x = parseInt(queryData.x),
                y = parseInt(queryData.y),
                op = queryData.op,
                result = calculator[op](x, y);

            res.write(result.toString());
            res.end();
            next();
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
                next();
            });
        }
    } else {
        next();
    }
}