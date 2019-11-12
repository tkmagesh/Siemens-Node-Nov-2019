module.exports = function(req, res, next){
    var logMessage = req.method + '\t' + req.urlObj.pathname;
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date(),
            elapsedTime = endTime - startTime;
        logMessage += '\t' + res.statusCode + '\t' + elapsedTime + 'ms';
        console.log(logMessage);
    });
    next();
}