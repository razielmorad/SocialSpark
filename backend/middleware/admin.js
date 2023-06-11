const jwt = require("jsonwebtoken");
const { JWTSecretToken } = require("../configs/config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).send("no token provided");
    return;
  }

  const payload = jwt.verify(token, JWTSecretToken);
  req.user = payload;
  if (!req.user.admin) {
    res.status(401).send("only admins are allowed to access this");
    return;
  }
  next();
};
