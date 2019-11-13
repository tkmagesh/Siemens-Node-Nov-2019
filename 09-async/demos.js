function f1Sync(){
    console.log('f1Sync started..');
    console.log('f1Sync completed..');
}

function f2Sync() {
    console.log('f2Sync started..');
    console.log('f2Sync completed..');
}

function f3Sync() {
    console.log('f3Sync started..');
    console.log('f3Sync completed..');
}

function f4Sync() {
    console.log('f4Sync started..');
    console.log('f4Sync completed..');
}

/* 
function runSync(){
    f1Sync();
    f2Sync();
    f3Sync();
    f4Sync();
}
*/

var syncFns = [f1Sync, f2Sync, f3Sync, f4Sync];

function runSync(){
    for(var index = 0, count = syncFns.length; index < count; index++){
        var syncFn = syncFns[index];
        syncFn();
    }
}

module.exports['runSync'] = runSync;

function f1Async(next) {
    console.log('f1Async started..');
    setTimeout(function(){
        console.log('f1Async completed..');
        if (typeof next === 'function')
            next();
    },6000)
}

function f2Async(next) {
    console.log('f2Async started..');
    setTimeout(function(){
        console.log('f2Async completed..');
        if (typeof next === 'function')
            next();
    },3000)
}

function f3Async(next) {
    console.log('f3Async started..');
    setTimeout(function(){
        console.log('f3Async completed..');
        if (typeof next === 'function')
            next();
    },4000)
}

function f4Async(next) {
    console.log('f4Async started..');
    setTimeout(function(){
        console.log('f4Async completed..');
        if (typeof next === 'function')
            next();
    },2000)
}

/* function runAsync() {
    f1Async(function(){
        f2Async(function(){
            f3Async(function(){
                f4Async();
            });
        });
    });
} */

var asyncFns = [ f1Async, f2Async, f3Async, f4Async ];

function exec(fns){
    var first = fns[0],
        remaining = fns.slice(1),
        next = function(){
            exec(remaining);
        };
    if (typeof first === 'function')
        first(next);
}

function runAsync(){
    exec(asyncFns);
}

module.exports['runAsync'] = runAsync;


function addSync(x,y){
    console.log('   [@Service] processing ', x , ' and ', y);
    var result = x + y;
    console.log('   [@Service] returning result');
    return result;
}

function addSyncClient(x,y){
    console.log('[@Client] triggering the service');
    var result = addSync(x,y);
    console.log('[@Client] result = ', result);
}

module.exports['addSyncClient'] = addSyncClient;

function addAsync(x, y, callback) {
    console.log('   [@Service] processing ', x, ' and ', y);
    setTimeout(function(){
        var result = x + y;
        console.log('   [@Service] returning result');
        callback(result);
    }, 4000);
}

function addAsyncClient(x, y) {
    console.log('[@Client] triggering the service');
    addAsync(x, y, function(result){
        console.log('[@Client] result = ', result);
    });
}

module.exports['addAsyncClient'] = addAsyncClient;

function addAsyncPromise(x, y) {
    console.log('   [@Service] processing ', x, ' and ', y);
    var p = new Promise(function(resolve, reject){
        setTimeout(function () {
            var result = x + y;
            console.log('   [@Service] returning result');
            resolve(result);
        }, 4000);
    });
    return p;
}