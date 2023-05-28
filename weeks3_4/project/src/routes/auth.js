const passport = require("passport");
const authRouter = require("express").Router();

authRouter
  .post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      res.json(req.user);
    }
  )
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      res.json(req.user);
      //res.redirect(`http://localhost:8000/users/${req.user}`);
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
