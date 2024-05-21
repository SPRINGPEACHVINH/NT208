const { get } = require("mongoose");
const Event = require("../models/Events");

const searchEvents = async (query) => {
  return Event.find({
    EventName: { $regex: new RegExp(query, "i") },
  }).select("EventId EventName EventTime EventLocation EventCategory TicketPrice Picture_event");
};

const addEvent = async (eventData) => {
  const event = new Event(eventData);
  return event.save();
};

const getAllEvents = async () => {
  return Event.find({}).select("EventId EventName EventTime EventCategory TicketPrice Picture_event");
};

const getEventById = async (EventId) => {
  return Event.findOne({ EventId: EventId });
};

const deleteEvent = async (EventId) => {
  return Event.findOneAndDelete({ EventId: EventId });
};

module.exports = {
  searchEvents,
  addEvent,
  getAllEvents,
  deleteEvent,
  getEventById,
};
