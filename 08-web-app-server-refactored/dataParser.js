var url = require('url');

module.exports = function(req, res, next){
    var urlObj = url.parse(req.url);
    req['urlObj'] = urlObj;
    next();
}