const TicketService = require("../services/TicketService");

const payForTicket = async (req, res) => {
  try {
    const { EventId, UserId } = req.body;
    const ticket = await TicketService.getRandomUnpaidTicket(EventId);
    if (!ticket) {
      return res.status(404).json({
        status: "ERROR",
        message: "No unpaid and unused ticket found",
      });
    }
    await TicketService.setTicketPaid(ticket._id, UserId);
    return res
      .status(200)
      .json({ status: "OK", message: "Ticket paid successfully" });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

const addTicketsToEvent = async (req, res) => {
  try {
    const { EventId, ticketCount } = req.body;

    if (!EventId) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "EventId is required" });
    }

    for (let i = 0; i < ticketCount; i++) {
      const ticketCode = generateTicketCode();
      console.log(i, ticketCode);
      await TicketService.addTicket(EventId, ticketCode);
    }
    return res
      .status(200)
      .json({ status: "OK", message: "Tickets added successfully" });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

function generateTicketCode() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  payForTicket,
  generateTicketCode,
  addTicketsToEvent,
};
