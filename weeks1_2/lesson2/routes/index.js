const routes = require('express').Router();
const connection = require('../mongodb/connect');

routes.get('/', () => {
    connection.main().catch(console.error);
});

module.exports = routes;