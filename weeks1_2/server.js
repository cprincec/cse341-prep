// import the express module
const express = require('express');
const mongodb = require('./mongodb/connect')
require('dotenv').config();

// create an express application
const app = express();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.main().catch(console.error)
.then(() => {
    app.listen(port, console.log(`Server running at port ${port} and  database connected`));
})






