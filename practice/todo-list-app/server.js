const express = require('express');
const mongodb = require('./mongodb/connect');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use('/', require('./api/routes/todoListRoutes'));

mongodb.main().catch(console.error)
.then(() => app.listen(port, console.log('DB connected and todo list RESTful API server started on: ' + port)));

