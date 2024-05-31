const Ticket = require("../models/Ticket");
const Event = require("../models/Events");
const User = require("../models/Users");

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

  const ticket = new Ticket({
    TicketId: ticketCode,
    TicketPath: event.VideoPath,
    TicketCode: ticketCode,
    EventId: event.EventId,
    UserId: null,
    isUsed: false,
    isPaid: false,
  });

  return ticket.save();
};

const useTicket = async (TicketId, UserName) => {
  const user = await User.findOne({ UserName: UserName });
  if (!user) {
    throw new Error(`User ${UserName} does not exist`);
  }

  const ticket = await Ticket.findOne({ TicketId: TicketId });
  if (!ticket) {
    throw new Error(`Ticket ${TicketId} does not exist`);
  }

  if (ticket.UserId !== user.Email) {
    throw new Error(`This ticket does not belong to you!`);
  }

  if (ticket.isUsed) {
    throw new Error(`This ticket has already been used`);
  }

  ticket.isUsed = true;
  await ticket.save();

  return ticket.TicketPath;
};

module.exports = {
  getRandomUnpaidTicket,
  setTicketPaid,
  addTicket,
  useTicket,
};
