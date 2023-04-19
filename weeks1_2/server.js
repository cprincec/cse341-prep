// import the express module
const express = require('express');

const routes = require('./routes');

// create an express application
const app = express();
let port = 3000;

app.use('/', require('./routes'));
app.listen(port, console.log(`Server running at port ${port}`));







