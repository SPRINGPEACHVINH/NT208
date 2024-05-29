const TicketController = require("../controllers/TicketController");

const express = require("express");
const router = express.Router();

router.post("/payForTicket", TicketController.payForTicket);
router.post("/addTicketsToEvent", TicketController.addTicketsToEvent);

module.exports = router;
