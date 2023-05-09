const app = require("express")();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
//   .use("/", require("./routes"));

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
