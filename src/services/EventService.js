const Event = require("../models/Events");

const searchEvents = async (query) => {
  return Event.find({
    EventName: { $regex: new RegExp(query, "i") },
  }).select("EventName EventTime EventLocation EventCategory TicketPrice RemainingTickets");
};

const addEvent = async (eventData) => {
  const event = new Event(eventData);
  return event.save();
};

module.exports = {
  searchEvents,
  addEvent,
};
