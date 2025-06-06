const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 👥 Public route to get 3 users (name only)
router.get('/users', async (req, res) => {
  const users = await User.find({}, 'username').limit(3);
  res.json(users);
});

module.exports = router;
