const EventService = require("../services/EventService");

const search = async (req, res) => {
  try {
    const query = req.query.q;
    const events = await EventService.searchEvents(query);

    return res.status(200).json({ status: "OK", data: events });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

const add = async (req, res) => {
  try {
    const event = await EventService.addEvent(req.body);

    return res.status(201).json({ status: "OK", data: event });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

const getAll = async (req, res) => {
  try {
    const events = await EventService.getAllEvents();

    return res.status(200).json({ status: "OK", data: events });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const result = await EventService.deleteEvent(req.params.id);

    if (!result) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Event not found" });
    }

    return res
      .status(200)
      .json({ status: "OK", message: "Event deleted successfully" });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

module.exports = {
  search,
  add,
  getAll,
  deleteById,
};
