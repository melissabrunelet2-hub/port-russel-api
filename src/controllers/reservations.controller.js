const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

exports.create = async (req, res) => {
  const catwayNumber = Number(req.params.id);

  const catway = await Catway.findOne({ catwayNumber });
  if (!catway) {
    return res.status(404).json({ message: "Catway introuvable" });
  }

  const reservation = new Reservation({
    catwayNumber,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut
  });

  await reservation.save();
  res.status(201).json(reservation);
};
