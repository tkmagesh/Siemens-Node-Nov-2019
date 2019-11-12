module.exports = function(req, res, next){
    if (!res.finished){
        res.statusCode = 404;
        res.end();
    }
    next();
}