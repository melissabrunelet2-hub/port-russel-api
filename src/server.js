require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connecté");
    app.listen(process.env.PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
