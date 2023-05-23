const express = require("express");
const app = express();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
require("dotenv").config();


const PORT = process.env.PORT || 3000;

app
  .use(express.json())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"))
  .use((error, req, res, next) => {
    res.status(error.status || 500)
    .send(
      {
        error: {
          status: error.status || 500,
          message: error.message
        }
      }
    );
  })

mongodb
  .main()
  .catch(console.error)
  .then(() =>
    app.listen(
      PORT,
      console.log(
        "DB connected and server started on: " + PORT
      )
    )
  );
