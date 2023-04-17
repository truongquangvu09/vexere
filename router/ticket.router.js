const express = require("express");
const {
  createTicket,
  ticketList,
  ticketDetail,
  deleteTicket,
} = require("../controller/ticket.controller");

const ticketRouter = express.Router();

ticketRouter.post("/", createTicket);
ticketRouter.get("/", ticketList);
ticketRouter.get("/:id", ticketDetail);
ticketRouter.delete("/:id", deleteTicket);

module.exports = {
  ticketRouter,
};
