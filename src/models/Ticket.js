const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
  {
    TicketId: { type: String, required: true, unique: true },
    TicketPath: { type: String, required: true },
    TicketPrice: { type: Number, required: true },
    TicketCode: { type: String, required: true},
    Event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true, unique: true},
    User: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true},
    isUsed: { type: Boolean, required: true },
    isPaid: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);
const Ticket = mongoose.model("Ticket", userSchema);
module.exports = Ticket;
