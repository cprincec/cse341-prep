// import the express module
const express = require('express');
const mongodb = require('./db/connect');
const bodyParser = require('body-parser');
// const morgan = require('morgan'); // This is used for logging http requests
const helmet = require("helmet"); // This is a security middleware that protects our app from attackers.
require('dotenv').config();


// create an express application
const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('common')); // morgan middleware using the 'common'  logging format;
app.use(helmet());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', require('./routes'));

mongodb.intiDb((err, mongodb) => {
    if (err) { 
        console.log(err) 
    } else { 
        app.listen(port, console.log(`Server running at port ${port} and  database connected`));
    }
})







