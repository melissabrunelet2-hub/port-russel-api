const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Erreur login" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Erreur login" });

  req.session.user = { id: user._id, email: user.email };
  res.json({ message: "Connecté" });
};
