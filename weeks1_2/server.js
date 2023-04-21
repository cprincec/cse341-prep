// import the express module
const express = require('express');
const mongodb = require('./db/connect')
require('dotenv').config();

// create an express application
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.intiDb((err, mongodb) => {
    if (err) { 
        console.log(err) 
    } else { 
        app.listen(port, console.log(`Server running at port ${port} and  database connected`));
    }
})







