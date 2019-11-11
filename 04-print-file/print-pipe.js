var fs = require('fs');
var stream = fs.createReadStream('./sample.txt', { encoding: 'utf8' });
stream.pipe(process.stdout);
var readCount = 0;
stream.on('data', function(){
    ++readCount;
});
stream.on('end', function(){
    console.log('readCount = ', readCount);
});