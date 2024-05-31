const express = require("express");
const cors = require("cors");

const router = express.Router();

router.use(cors());

const BtcController = require("../controllers/BtcController");

router.post("/add", BtcController.add);

module.exports = router;
