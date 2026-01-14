const Catway = require("../models/Catway");

exports.getAll = async (req, res) => {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.json(catways);
};

exports.getOne = async (req, res) => {
  const id = Number(req.params.id);
  const catway = await Catway.findOne({ catwayNumber: id });
  if (!catway) {
    return res.status(404).json({ message: "Catway introuvable" });
  }
  res.json(catway);
};

exports.create = async (req, res) => {
  const { catwayNumber, catwayType, catwayState } = req.body;

  const exists = await Catway.findOne({ catwayNumber });
  if (exists) {
    return res.status(400).json({ message: "Catway déjà existant" });
  }

  const catway = await Catway.create({
    catwayNumber,
    catwayType,
    catwayState,
  });

  res.status(201).json(catway);
};
