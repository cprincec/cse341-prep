const router = require('express').Router();
const todoList = require('../controllers/todoListController');

router.route('/tasks')
    .get(todoList.listAllTasks())
    .post(todoList.createTask());

router.route('/tasks/:taskId')
    .get(todoList.readATask())
    .put(todoList.updateATask())
    .delete(todoList.deleteATask());

module.exports = router;