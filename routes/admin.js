const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Middleware to check for admin role
function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Access denied: Admins only' });
  }
  next();
}

// 🔐 Get all users (admin only)
router.get('/users', auth, isAdmin, async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
});

// 🗑 Delete user by ID (admin only)
router.delete('/user/:id', auth, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
});

// ✏️ Edit user by ID (admin only)
router.put('/user/:id', auth, isAdmin, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

module.exports = router;

