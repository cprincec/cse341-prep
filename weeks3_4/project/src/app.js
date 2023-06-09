const express = require("express");
const app = express();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
require("./config/passport")(passport);
const PORT = process.env.PORT || 3000;

app
  .use(express.json())
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })

  // Sessions
  .use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      // don't save a session until something is saved
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: false, maxAge: 1000 * 24 * 60 },
      store: MongoStore.create({ mongoUrl: process.env.URI }),
    })
  )

  // Passport middleware
  .use(passport.initialize())
  .use(passport.session())

  .use("/", require("./routes/index"))
  .use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message,
      },
    });
  });

mongodb
  .main()
  .catch(console.error)
  .then(() =>
    app.listen(PORT, console.log("DB connected and server started on: " + PORT))
  );
