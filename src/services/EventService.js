const Event = require("../models/Events");

const searchEvents = async (query) => {
  return Event.find({
    EventName: { $regex: new RegExp(query, "i") },
  }).select("EventName EventTime EventLocation EventCategory TicketPrice Picture_event");
};

const addEvent = async (eventData) => {
  const event = new Event(eventData);
  return event.save();
};

const getAllEvents = async () => {
  return Event.find({}).select("EventName EventTime EventCategory TicketPrice Picture_event");
};

const deleteEvent = async (EventId) => {
  return Event.findOneAndDelete({ EventId: EventId });
};

module.exports = {
  searchEvents,
  addEvent,
  getAllEvents,
  deleteEvent,
};
