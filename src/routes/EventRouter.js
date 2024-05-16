const express = require("express");
const router = express.Router();
const EventController = require("../controllers/EventController");

router.get("/search", EventController.search);
router.post("/add", EventController.add);

module.exports = router;
