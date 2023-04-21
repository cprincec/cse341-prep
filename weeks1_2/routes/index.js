const express = require('express');
const controller = require('../controller');
const user = require('../controller/user');
const routes = express.Router();

routes.get('/', controller.displayName);
routes.get('/user', user.getUser);
module.exports = routes;