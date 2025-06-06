const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

let posts = []; // Temporary in-memory storage

// 📄 Create a new post (with 5+ fields)
router.post('/', auth, (req, res) => {
  const { title, body, category, tags, image } = req.body;

  if (!title || !body || !category || !tags || !image) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    body,
    category,
    tags,
    image,
    user: req.user.username,
    createdAt: new Date(),
  };

  posts.push(newPost);
  res.status(201).json(newPost);
});

module.exports = router;

