const Ticket = require("../models/Ticket");
const Event = require("../models/Events");

const getRandomUnpaidTicket = async (EventId) => {
  return Ticket.findOne({ EventId: EventId, isPaid: false, isUsed: false });
};

const setTicketPaid = async (TicketId, UserId) => {
  return Ticket.updateOne(
    { TicketId: TicketId },
    { isPaid: true, UserId: UserId }
  );
};

const addTicket = async (EventId, ticketCode) => {
  const event = await Event.findOne({ EventId: EventId });
  if (!event) {
    throw new Error(`Event with EventId ${EventId} does not exist`);
  }

  console.log(
    `Adding ticket for EventId: ${EventId} with ticketCode: ${ticketCode}`
  );

  const ticket = new Ticket({
    TicketId: ticketCode,
    TicketPath: event.VideoPath,
    TicketCode: ticketCode,
    EventId: EventId,
    UserId: null,
    isUsed: false,
    isPaid: false,
  });

  return ticket.save();
};

module.exports = {
  getRandomUnpaidTicket,
  setTicketPaid,
  addTicket,
};
