var chalk = require('chalk');

module.exports = function(req, res, next){
    var logMessage = chalk.greenBright(req.method) + '\t' + chalk.yellow(req.urlObj.pathname);
    var startTime = new Date();
    res.on('finish', function(){
        var endTime = new Date(),
            elapsedTime = endTime - startTime;
        logMessage += '\t' + chalk.red(res.statusCode) + '\t' + chalk.bold.cyan(elapsedTime) + 'ms';
        console.log(logMessage);
    });
    next();
}