const express = require("express");
const router = express.Router();

const EventController = require("../controllers/EventController");

router.get("/search", EventController.search);

module.exports = router;
