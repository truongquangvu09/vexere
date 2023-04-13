const { Op } = require("sequelize");
const { Station } = require("../models/index");
const createStation = async (req, res) => {
  const { name, address, province } = req.body;
  try {
    const newStation = await Station.create({ name, address, province });
    res.status(201).send(newStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllStation = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const stationList = await Station.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`,
          },
        },
      });
      res.status(200).send(stationList);
    } else {
      const stationList = await Station.findAll();
      res.status(200).send(stationList);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailStation = async (req, res) => {
  const { id } = req.params;
  try {
    const detailStation = await Station.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(detailStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateStations = async (req, res) => {
  const { id } = req.params;
  const { name, address, province } = req.body;
  try {
    const detailStation = await Station.findOne({
      where: {
        id,
      },
    });
    detailStation.name = name;
    detailStation.address = address;
    detailStation.province = province;
    detailStation.save();
    res.status(200).send(detailStation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteStations = async (req, res) => {
  const { id } = req.params;
  try {
    const deteleStation = await Station.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xoa thanh cong");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createStation,
  getAllStation,
  getDetailStation,
  updateStations,
  deleteStations,
};
