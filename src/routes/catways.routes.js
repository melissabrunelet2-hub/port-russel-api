const express = require("express");
const router = express.Router();
const catwaysController = require("../controllers/catways.controller");
const reservationsRoutes = require("./reservations.routes");

router.get("/", catwaysController.getAll);
router.get("/:id", catwaysController.getOne);
router.post("/", catwaysController.create);

router.use("/:id/reservations", reservationsRoutes);

module.exports = router;
