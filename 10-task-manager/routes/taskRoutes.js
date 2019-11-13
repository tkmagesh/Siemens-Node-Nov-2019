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

module.exports = router;