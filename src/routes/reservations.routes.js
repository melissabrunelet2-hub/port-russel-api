const express = require("express");
const router = express.Router({ mergeParams: true });
const reservationsController = require("../controllers/reservations.controller");

router.post("/", reservationsController.create);

module.exports = router;
