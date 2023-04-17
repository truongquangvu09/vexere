const { Ticket, Trip, User } = require("../models/index");

const createTicket = async (req, res) => {
  const { trip_id, user_id } = req.body;
  try {
    const ticket = await Ticket.create({ trip_id, user_id });
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send({ messenger: error });
  }
};

const ticketList = async (req, res) => {
  const ticketLists = await Ticket.findAll({
    include: [
      {
        model: Trip,
      },
      {
        model: User,
      },
    ],
  });
  res.status(200).send(ticketLists);
};

const ticketDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const ticketDetails = await Ticket.findOne({
      where: {
        id,
      },
    });
    res.status(200).send(ticketDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteTicket = async (req, res) => {
  const { id } = req.params;
  try {
    const ticketDeleted = await Ticket.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("xoa thanh cong");
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = {
  createTicket,
  ticketList,
  ticketDetail,
  deleteTicket,
};
