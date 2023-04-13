const express = require("express");
const {
  createStation,
  getAllStation,
  getDetailStation,
  updateStations,
  deleteStations,
} = require("../controller/station.controller");

const { Station } = require("../models/index");
const { checkExist } = require("../middlewares/validations/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorization } = require("../middlewares/auth/authorize");
const stationRouter = express.Router();

stationRouter.post("/", authenticate,authorization(["admin"]), createStation);
stationRouter.get("/", getAllStation);
stationRouter.get("/:id", getDetailStation);
stationRouter.post("/:id", checkExist(Station), updateStations);
stationRouter.delete("/:id",authenticate, checkExist(Station), deleteStations);

module.exports = {
  stationRouter,
};
