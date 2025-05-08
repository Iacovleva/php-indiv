const router = require("express").Router();
const User = require("../models/user");
const verifyToken = require("../middlewares/verifyToken");

// Получение профиля пользователя (только с токеном)
router.get("/profile", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "Пользователь не найден" });

        res.status(200).json({
            username: user.username,
            email: user.email,
            createdAt: user.createdAt
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

// Обновление профиля пользователя
router.put("/profile", verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { $set: req.body },
            { new: true }
        );

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Удаление аккаунта
router.delete("/profile", verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.status(200).json({ message: "Аккаунт успешно удалён" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
