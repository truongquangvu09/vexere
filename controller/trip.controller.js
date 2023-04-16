const { Trip, Station } = require("../models/index");

const createTrip = async (req, res) => {
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const newTrip = await Trip.create({
      fromStation,
      toStation,
      startTime,
      price,
    });
    res.status(200).json(newTrip);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const getAll = async (req, res) => {
  try {
    const tripList = await Trip.findAll({
      include: [
        {
          model: Station,
          as: "from",
        },
        {
          model: Station,
          as: "to",
        },
      ],
    });
    res.status(200).send(tripList);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const deleteTrip = async (req, res) => {
  const { id } = req.params;

  try {
    const tripDeleted = await Trip.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xoa thanh cong");
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const updateTrip = async (req, res) => {
  const { id } = req.params;
  const { fromStation, toStation, startTime, price } = req.body;
  try {
    const trip = await Trip.update(
      { fromStation, toStation, startTime, price },
      { where: { id } }
    );
    res.status(200).send("update thanh cong");
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = {
  createTrip,
  getAll,
  deleteTrip,
  updateTrip,
};
