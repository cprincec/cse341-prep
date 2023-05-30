const passport = require("passport");
const { ensureGuest } = require("../middlewares/auth");
const authRouter = require("express").Router();

authRouter
  .post(
    "/login",
    passport.authenticate('local'), (req, res) => {   
      res.status(200).json(req.user)}   
  )
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
