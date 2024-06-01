const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    TicketId: { type: String, required: true },
    TicketPath: { type: String, required: false },
    TicketCode: { type: String, required: true },
    EventId: { type: String, sparse: true },
    UserId: { type: String, sparse: true },
    isUsed: { type: Boolean, required: true },
    isPaid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;
