var express = require('express'),
    router = express.Router();

var taskList = [
    { id: 1, name: 'Learn JavaScript', isCompleted: false},
    { id: 2, name: 'Explore ECity', isCompleted: true },
];

router.get('/', function(req, res, next){
    res.json(taskList);
});

router.get('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id);
    var result = taskList.find(function(task){
        return task.id === taskId;
    });
    if (result){
        res.json(result);
    } else {
        res.status(404).end();
    }
});

router.post('/', function(req, res, next){
    var data = req.body,
        newTaskId = taskList.reduce(function(result, task){
            return result > task.id ? result : task.id
        }, 0) + 1;
    data.id = newTaskId;
    taskList.push(data);
    res.status(201).json(data);
});

router.put('/:id', function(req, res, next){
    var data = req.body,
        taskId = parseInt(req.params.id);
    taskList = taskList.map(function(task){
        return task.id === taskId ? data : task;
    });
    res.json(data);
});

router.delete('/:id', function (req, res, next) {
    var taskId = parseInt(req.params.id);
    var taskToDelete = taskList.find(function(task){
        return task.id === taskId;
    });
    if(taskToDelete){
        taskList = taskList.filter(function(task){
            return task.id !== taskId;
        });
        res.json(null);
    } else {
        res.status(404).end();
    }
});

module.exports = router;