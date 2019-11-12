module.exports = function(req, res, next){
    if (!res.finished){
        console.log('[@notFoundHandler] serving 404');
        res.statusCode = 404;
        res.end();
    }
    next();
}