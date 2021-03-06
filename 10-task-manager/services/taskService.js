var taskDb = require('./taskDb');

var taskList = [
    { id: 1, name: 'Learn JavaScript', isCompleted: false },
    { id: 2, name: 'Explore ECity', isCompleted: true },
];

function getAll(){
    //return taskList;
    return taskDb.readData();
}

/* function get(id){
    return taskDb
        .readData
        .then(function(taskList){
            return taskList.find(function (task) {
                return task.id === id;
            });
        });
}

function addNew(data){
    var newTaskId = taskList.reduce(function (result, task) {
            return result > task.id ? result : task.id
        }, 0) + 1;
    data.id = newTaskId;
    return taskDb
        .readData()
        .then(function(taskList){
            taskList.push(data);
            return taskDb
                .saveData(taskList)
                .then(function(){
                    return data;
                });
        });
} */

async function get(id) {
    var taskList = await taskDb.readData();
    return taskList.find(function (task) {
        return task.id === id;
    });
}

async function addNew(data) {
    var taskList = await taskDb.readData();
    var newTaskId = taskList.reduce(function (result, task) {
        return result > task.id ? result : task.id
    }, 0) + 1;
    data.id = newTaskId;
    taskList.push(data);
    await taskDb.saveData(taskList)
    return data;            
}

function update(id, data){
    taskList = taskList.map(function (task) {
        return task.id === id ? data : task;
    });
    return data;
}

function remove(taskId){
    var taskToDelete = taskList.find(function (task) {
        return task.id === taskId;
    });
    if (taskToDelete) {
        taskList = taskList.filter(function (task) {
            return task.id !== taskId;
        });
    } else {
        return false;
    }
}

module.exports = {
    addNew,
    getAll,
    get,
    update,
    remove
};