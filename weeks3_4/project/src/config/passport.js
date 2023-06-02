const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../model/User");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        let userData = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          phoneNumber: "",
          password: "",
          oAuth: "1",
        };

        try {
          let userObj = await User.findOne({ email: profile.emails[0].value });

          if (userObj) {
            // This user already exists
            console.log("User already exists");
            return done(null, userObj);
          } else {
            let url = "http://localhost:8000/users";
            axios
              .post(url, userData)
              .then((result) => {
                console.log("Inside then");
                done(null, result.data);
              })
              .catch((err) =>
                console.log(err.message || "Error while creating user")
              );
          }
        } catch (error) {
          console.log(error.message);
        }
      }
    )
  );
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (email, password, done) => {
        try {
          // Find the user by their email
          const user = await User.findOne({ email });

          // If user is not found, return error
          if (!user) {
            return done(null, false, {
              status: 401,
              message: "Incorrect email or password",
            });
          }

          // Compare the provided password with the hashed password stored in the database
          const isMatch = await bcrypt.compare(password, user.password);

          // If passwords don't match, return error
          if (!isMatch) {
            console.log("Inside !isMatch");
            return done(null, false, {
              status: 401,
              message: "Incorrect email or password",
            });
          }

          // If everything is successful, return the user object
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    process.nextTick(function () {
      done(null, user._id);
    });
  });

  passport.deserializeUser((user, done) => {
    console.log(user);
    User.findOne({ _id: user }).then((user) => {
      console.log(user);
      return done(null, user);
    });
  });
};
