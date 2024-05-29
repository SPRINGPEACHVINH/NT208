const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

const EventController = require("../controllers/EventController");

router.get("/search", EventController.search);
router.post("/add", EventController.add);
// router.get("/all", EventController.getAll);
router.delete("/delete/:id", EventController.deleteById);
router.get("/last", EventController.getLast);
router.get("/:id", EventController.getById);

module.exports = router;
