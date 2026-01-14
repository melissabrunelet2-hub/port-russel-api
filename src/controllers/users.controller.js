const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.getAll = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

exports.getOneByEmail = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ email }).select("-password");
  if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
  res.json(user);
};

exports.create = async (req, res) => {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email déjà utilisé" });

  const hash = await bcrypt.hash(password, 10);
  const created = await User.create({ username, email, password: hash });

  res.status(201).json({ id: created._id, username: created.username, email: created.email });
};

exports.updateByEmail = async (req, res) => {
  const { email } = req.params;
  const { username, password } = req.body;

  const update = {};
  if (username) update.username = username;
  if (password) update.password = await bcrypt.hash(password, 10);

  const updated = await User.findOneAndUpdate({ email }, update, { new: true }).select("-password");
  if (!updated) return res.status(404).json({ message: "Utilisateur introuvable" });

  res.json(updated);
};

exports.removeByEmail = async (req, res) => {
  const { email } = req.params;
  const deleted = await User.findOneAndDelete({ email });
  if (!deleted) return res.status(404).json({ message: "Utilisateur introuvable" });

  res.json({ message: "Utilisateur supprimé" });
};
