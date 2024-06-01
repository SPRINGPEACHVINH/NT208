const express = require("express");
const router = express.Router();

const MailController = require("../controllers/MailController");

router.get('/send', MailController.sendMail)

module.exports = router;