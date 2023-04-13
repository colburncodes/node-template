const jwt = require("jsonwebtoken");

const handleAuthError = (res) =>
  res.status(401).send({ message: "Authorization Error" });

const extractBearerToken = (header) => header.replace("Bearer", "");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload; // assigning payload to req.user

  return next();
};
