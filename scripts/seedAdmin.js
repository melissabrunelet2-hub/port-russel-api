require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../src/models/User");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash("Admin123!", 10);

  await User.deleteMany({});
  await User.create({
    email: "admin@port-russel.com",
    password: hash
  });

  console.log("Admin créé");
  process.exit();
});
