const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });

const register = async (req, res) => {
  try {
    const { name, email, password, preferredLanguage } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "name, email and password are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already registered" });

    const user = await User.create({ name, email, password, preferredLanguage });
    const token = generateToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const match = await user.comparePassword(password);
    if (!match) return res.status(401).json({ error: "Invalid email or password" });

    const token = generateToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, preferredLanguage: user.preferredLanguage },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };