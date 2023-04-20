const mongoose = require('mongoose');
const Task = mongoose.model('Tasks');

function listAllTasks(req, res) {
    Task.find({}, (err, tasks) => {
        if (err) res.send(err);
        res.json(tasks);
    })
}

function createTask(req, res) {
    let newTask = new Task(req.body);
    newTask.save((err, task) => {
        if (err) res.send(err);
        res.json(task);
    })
}

function readATask(req, res) {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) res.send(err);
        res.json(task);
    })
}

function updateATask(req, res) {
    Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, 
        (err, task) => {
        if (err) res.send(err);
        res.json(task);
    })
}

function deleteATask(req, res) {
    Task.remove({_id: req.params.taskId}, (err, removeOutcome) => {
        if (err) res.send(err);
        res.json(removeOutcome);
    })
}

module.exports = { listAllTasks, createTask, readATask, updateATask, deleteATask };