const expresss = require('express');
const app = expresss();
require('dotenv').config();
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, console.log(`Server running at port ${port}`));