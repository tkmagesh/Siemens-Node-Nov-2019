var express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService');



router.get('/', function(req, res, next){
    var tasks = taskService.getAll();
    res.json(tasks);
});

router.get('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id);
    var result = taskService.get(taskId);
    if (result){
        res.json(result);
    } else {
        res.status(404).end();
    }
});

router.post('/', function(req, res, next){
    var data = taskService.addNew(req.body);
    res.status(201).json(data);
});

router.put('/:id', function(req, res, next){
   var data = taskService.update(parseInt(req.params.id), req.body);
    res.json(data);
});

router.delete('/:id', function (req, res, next) {
   if (taskService.remove(parseInt(req.params.id))){
        res.json(null);
    } else {
        res.status(404).end();
    }
});

module.exports = router;