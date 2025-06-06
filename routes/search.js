const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middlewares/verifyToken');

/**
 * @route GET /api/search
 * @desc Поиск пользователей по username или email
 * @access Защищённый
 */
router.get('/', auth, async (req, res) => {
  const { username, email } = req.query;

  try {
    const query = {};
    if (username) query.username = { $regex: username, $options: 'i' };
    if (email) query.email = { $regex: email, $options: 'i' };

    const results = await User.find(query, '-password');
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при поиске' });
  }
});

module.exports = router;
