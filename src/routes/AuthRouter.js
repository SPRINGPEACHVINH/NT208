const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      status: "OK",
      message: "User has successfully authenticated",
      user: req.user,
    });
  } else {
    res.status(401).json({
      status: "ERROR",
      message: "Failed to authenticate",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    status: "ERROR",
    message: "Failed to login",
  });
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
