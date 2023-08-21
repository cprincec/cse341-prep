const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../model/User");
const userController = require("../controller/users");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        try {
          let userObj = await User.findOne({ email: profile.emails[0].value });

          if (userObj) return done(null, userObj);
          else {
            let userData = {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: profile.emails[0].value,
              phoneNumber: "",
              password: "",
              oAuth: "1",
            };
            let newUserModel = new User(userData);
            let newUser = await newUserModel.save();
            if (!newUser) {
              return done(null, false, {
                status: 500,
                message: "error creating user",
              });
            }
            const token = jwt.sign(
              { userId: newUser._id },
              process.env.JWT_KEY
            );
            newUser.token = token;
            return done(null, newUser);
          }
        } catch (error) {
          console.log(error.message);
          return done(error);
        }
      }
    )
  );

  // passport.serializeUser((user, done) => {
  //   process.nextTick(function () {
  //     done(null, user._id);
  //   });
  // });

  // passport.deserializeUser((user, done) => {
  //   console.log(user);
  //   User.findOne({ _id: user }).then((user) => {
  //     console.log(user);
  //     return done(null, user);
  //   });
  // });
};
