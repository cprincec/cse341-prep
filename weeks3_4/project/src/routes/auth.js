const passport = require("passport");
const authRouter = require("express").Router();
const userController = require("../controller/users");

authRouter
  .post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
  })
  // This route is getting user with an active session
  // For situations when i dont want to store data in the browser
  .get("/refresh", (req, res, next) => {
    s;
    if (!req.session.passport) {
      res.status(401);
    }
    req.params.userId = req.session.passport.user;
    userController.getUserById(req, res, next);
  })
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.status(200).json(req.user);
    }
  )
  .get("/logout", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("http://localhost:8000/shops");
    });
  });

module.exports = authRouter;
