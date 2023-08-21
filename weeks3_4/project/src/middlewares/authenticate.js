const jwt = require("jsonwebtoken");

async function authenticate(req, res, next) {
  console.log(req.headers.authorization);

  const auth = req.headers.authorization;
  if (!auth) {
    res.status(401).send("Not authorized");
  } else {
    const token = auth.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(401).json("Not authorized");
      }

      req.user = user;
      next();
    });
  }
}

module.exports = { authenticate };
