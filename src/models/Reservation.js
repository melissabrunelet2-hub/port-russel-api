const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  catwayNumber: Number,
  clientName: String,
  boatName: String,
  checkIn: String,
  checkOut: String
});

module.exports = mongoose.model("Reservation", reservationSchema);
