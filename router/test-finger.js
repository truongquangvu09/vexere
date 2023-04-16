const express = require("express");

const fingerprintRouter = express.Router();

fingerprintRouter.get("/", (req, res) => {
  res.send(req.fingerprint)
});

module.exports = {
  fingerprintRouter,
};
