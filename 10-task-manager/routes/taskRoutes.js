var express = require('express'),
    router = express.Router(),
    taskService = require('../services/taskService');



/* router.get('/', function(req, res, next){
    taskService
        .getAll()
        .then(function(taskList){
            res.json(taskList);
        });
});

router.get('/:id', function(req, res, next){
    var taskId = parseInt(req.params.id);
    taskService
        .get(taskId)
        .then(function(result){
            if (result) {
                res.json(result);
            } else {
                res.status(404).end();
            }
        })
    
});
 */

router.get('/', async function (req, res, next) {
    var taskList = await taskService.getAll()
    res.json(taskList);
});

router.get('/:id', async function (req, res, next) {
    var taskId = parseInt(req.params.id);
    var result = await taskService.get(taskId);
    if (result) {
        res.json(result);
    } else {
        res.status(404).end();
    }
});

router.post('/', function(req, res, next){
    taskService
        .addNew(req.body)
        .then(function(newTask){
            res.status(201).json(newTask);
        })
    
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