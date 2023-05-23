const express = require('express');
const swaggerRouter = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

swaggerRouter.use('/', swaggerUi.serve);
swaggerRouter.get('/', swaggerUi.setup(swaggerDocument));

module.exports = swaggerRouter;