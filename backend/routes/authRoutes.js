const express = require("express");
const router = express.Router();

const {
  register,
  login,
  upgradeToAdmin
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", register);

// LOGIN
router.post("/login", login);

// UPGRADE TO ADMIN (LOGGED-IN USER)
router.post("/upgrade", authMiddleware, upgradeToAdmin);

module.exports = router;