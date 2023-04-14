const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const Status = require("../utils/error");

const handleAuthError = (res) =>
  res.status(Status.Forbidden).send({ message: "Authorization Error" });

const extractBearerToken = (header) => header.replace("Bearer", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(Status.Forbidden).send({ error: "Unauthorized" });
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // assigning payload to req.user

  return next();
};
