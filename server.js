const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const adminRoutes = require('./routes/admin');
const postRoutes = require('./routes/post');
const publicRoutes = require('./routes/public');

const app = express();
dotenv.config();

// Подключение к MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ DB Error:", err));

// Middleware для обработки JSON
app.use(express.json());

// Подключение маршрутов
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/public', publicRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
