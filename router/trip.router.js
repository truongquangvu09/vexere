const express = require("express");
const {
  createTrip,
  getAll,
  deleteTrip,
  updateTrip,
} = require("../controller/trip.controller");

const tripRouter = express.Router();

tripRouter.post("/", createTrip);
tripRouter.get("/", getAll);
tripRouter.delete("/:id", deleteTrip);
tripRouter.put("/:id",updateTrip)

module.exports = {
  tripRouter,
};
