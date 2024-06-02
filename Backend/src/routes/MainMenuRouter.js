const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.status(200).json({
        status: "OK",
        message: "Welcome to the Main Menu! There nothing here yet",
      });
})

module.exports = router;