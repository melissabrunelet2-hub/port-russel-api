const express = require("express");
const router = express.Router();
const authRequired = require("../middleware/authRequired");

router.get("/users", authRequired, async (req, res) => {
  res.json({ message: "OK users", sessionUser: req.session.user });
});

module.exports = router;
