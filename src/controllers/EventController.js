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

module.exports = {
  search,
  add,
};
