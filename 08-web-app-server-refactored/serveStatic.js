var fs = require('fs'),
    path = require('path');

var staticExtns = ['.html', '.css', '.js', '.xml', '.json', '.txt', '.png', '.ico'];

function isStatic(resourceName) {
    return staticExtns.indexOf(path.extname(resourceName)) >= 0;
}

module.exports = function(req, res, next){
    var resourceName = req.urlObj.pathname === '/' ? 'index.html' : req.urlObj.pathname;
    if (isStatic(resourceName)) {
        var resourcePath = path.join(__dirname, resourceName);
        if (!fs.existsSync(resourcePath)) {
            res.statusCode = 404;
            res.end();
            return;
        }
        //Sync logic below..  DO NOT USE IT!!!
        /* var fileContents = fs.readFileSync(resourcePath);
        res.write(fileContents);
        res.end(); */

        var stream = fs.createReadStream(resourcePath);
        /* stream.on('data', function(chunk){
            console.log('[@serveStatic] serving file chunk');
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('[@serveStatic] ending response');
            res.end();
            next();
        }); */
        stream.pipe(res);

        stream.on('end', function () {
            next();
        })
    } else {
        next();
    }
}