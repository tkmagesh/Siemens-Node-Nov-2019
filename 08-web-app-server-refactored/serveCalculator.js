var querystring = require('querystring'),
    calculator = require('./calculator');

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname;
    if (resourceName === '/calculator') {
        var data = req.method === 'GET' ? req.queryData : req.bodyData,
            x = parseInt(data.x),
            y = parseInt(data.y),
            op = data.op,
            result = calculator[op](x, y);

        res.write(result.toString());
        res.end();
        next();
    } else {
        next();
    }
}