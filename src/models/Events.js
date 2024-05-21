const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema(
  {
    EventId: { type: String, required: true, unique: true },
    EventName: { type: String, required: true },
    EventTime: { type: Date, required: true },
    EventInfo: { type: String, required: false },
    EventLocation: { type: String, required: true },
    EventCategory: { type: String, required: true },
    TicketPrice: { type: Number, required: true },
    Picture_event: { type: String, required: true },
    Logo_event: { type: String, required: false },
    Btc: { type: mongoose.Schema.Types.ObjectId, ref: "Btc", required: false },
  },
  {
    timestamps: true,
  }
);
const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
