var fs = require('fs');
var dataFile = require('path').join(__dirname, '../db/tasks.json');

/* function readData(callback){
    fs.readFile('../db/tasks.json', {encoding : 'utf8'}, function(err, fileContents){
        if (err){
            return callback(err);
        }
        var taskList = JSON.parse(fileContents);
        callback(null, taskList)
    })
}

function saveData(taskList, callback){
    fs.writeFile('../db/tasks.json', JSON.stringify(taskList), callback);
} */

/* function readData() {
    return new Promise(function(resolveFn, rejectFn){
        fs.readFile(dataFile, { encoding: 'utf8' }, function (err, fileContents) {
            if (err) {
                return rejectFn(err);
            }
            var taskList = JSON.parse(fileContents);
            return resolveFn(taskList);
        })
    });
}

function saveData(taskList) {
    return new Promise(function(resolveFn, rejectFn){
        fs.writeFile(dataFile, JSON.stringify(taskList), function(err){
            if (err){
                return rejectFn(err);
            }
            return resolveFn();
        });
    });
} */

var util = require('util');
    readFileAsync = util.promisify(fs.readFile),
    writeFileAsync = util.promisify(fs.writeFile);

/* function readData() {
    return readFileAsync(dataFile, { encoding : 'utf8'})
        .then(function(fileContents){
            return JSON.parse(fileContents);
        });
} */

async function readData() {
    var fileContents = await readFileAsync(dataFile, { encoding: 'utf8' });
    return JSON.parse(fileContents);
}

function saveData(taskList) {
    return writeFileAsync(dataFile, JSON.stringify(taskList));
}
module.exports = {
    readData,
    saveData
};