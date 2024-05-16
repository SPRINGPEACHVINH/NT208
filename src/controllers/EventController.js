const search = async (req, res) => {
  try {
    const query = req.query.q;
    const events = await Event.find({
      EventName: { $regex: new RegExp(query, "i") },
    }).select("EventName EventTime EventInfo EventCategory TicketPrice Picture_event Logo_event");

    return res.status(200).json(events);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};
