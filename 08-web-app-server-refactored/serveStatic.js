var fs = require('fs'),
    path = require('path');

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico'];

function isStatic(resourceName) {
    return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(publicResourcePath){ /* middleware factory */
    return function(req, res, next){
        var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
        if (isStatic(resourceName)) {
            var resourcePath = path.join(publicResourcePath, resourceName);
            if (!fs.existsSync(resourcePath)) {
                res.statusCode = 404;
                res.end();
                return;
            }
            var stream = fs.createReadStream(resourcePath);
            stream.pipe(res);
            stream.on('end', function () {
                next();
            })
        } else {
            next();
        }
    }
};