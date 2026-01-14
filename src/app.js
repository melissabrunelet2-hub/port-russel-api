const express = require("express");
const path = require("path");

const app = express();

/* =====================
   CONFIG
===================== */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* =====================
   ROUTES PAGES
===================== */

// Page d'accueil
app.get("/", (req, res) => {
  res.render("home");
});

// Page login
app.get("/login", (req, res) => {
  res.render("login");
});

// Traitement login (simple pour le devoir)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // identifiants demandés dans le rendu
  if (email === "admin@port-russel.fr" && password === "admin123") {
    return res.render("dashboard", {
      email,
      date: new Date().toLocaleDateString()
    });
  }

  res.status(401).send("Identifiants incorrects");
});

/* =====================
   API (optionnel mais OK)
===================== */
app.get("/api", (req, res) => {
  res.json({ message: "API Port Russel opérationnelle" });
});

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app;
