var fs = require('fs');

fs.readFile('./sample.txt', { encoding : 'utf8'}, function(err, fileContents){
    if (err){
        console.log('something went wrong!');
        console.log(err);
        return;
    }
    console.log(fileContents);
    console.log('Thats all folks!');
});
