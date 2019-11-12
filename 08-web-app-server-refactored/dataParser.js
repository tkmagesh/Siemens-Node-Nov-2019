var url = require('url');

module.exports = function(req){
    var urlObj = url.parse(req.url);
    req['urlObj'] = urlObj;
}