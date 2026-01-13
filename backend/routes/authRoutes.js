const express = require("express");
const router = express.Router();
const { register, login, upgradeToAdmin } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// 🔥 upgrade role
router.put("/upgrade", authMiddleware, upgradeToAdmin);

module.exports = router;