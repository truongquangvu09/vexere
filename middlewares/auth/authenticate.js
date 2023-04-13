const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("token");
  try {
    const decode = jwt.verify(token, "tokenok");
    if (decode) {
      return next();
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  authenticate,
};
