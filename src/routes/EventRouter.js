const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

const EventController = require("../controllers/EventController");

router.get("/search", EventController.search);
router.post("/add", EventController.add);
router.get("/all", EventController.getAll);

module.exports = router;
