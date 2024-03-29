const express = require("express");
const app = express();
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const morgan = require("morgan"); // This is used for logging http requests
const helmet = require("helmet"); // This is a security middleware that protects our app from attackers.
const cors = require("cors");
require("dotenv").config();
require("./config/passport")(passport);
const PORT = process.env.PORT || 3000;

app
  // .use(cors())
  .use(morgan("common")) // morgan middleware using the 'common'  logging format;
  .use(helmet())
  .use(express.json())
  .use(bodyParser.json())
  // .use((req, res, next) => {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  //   );
  //   res.setHeader(
  //     "Access-Control-Allow-Methods",
  //     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  //   );
  //   next();
  // })

  .use((req, res, next) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://192.168.83.198:5173",
      "http://192.168.186.198:5173",
      "http://192.168.144.198:5173",
      "http://192.168.55.198:5173",
      "http://192.168.99.198:5173",
      "http://192.168.234.198:5173",
      "https://centralmall.netlify.app",
      "https://accounts.google.com",
    ];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    return next();
  })

  // Passport middleware
  .use(passport.initialize())
  // .use(passport.session())

  .use("/", require("./routes/index"))
  .use((error, req, res, next) => {
    res.status(error.status || 500).json({
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
