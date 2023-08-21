const passport = require("passport");
const authRouter = require("express").Router();
const jwt = require("jsonwebtoken");

authRouter
  .get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  )
  .get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/", session: false }),
    (req, res) => {
      const token = jwt.sign({ userId: req.user._id }, process.env.JWT_KEY);
      res.status(200).json({ user: req.user, token });
    }
  );

module.exports = authRouter;
