const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

/* =========================
   CORS CONFIG (VERY IMPORTANT)
========================= */
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://questly-frontend.onrender.com" // deployed frontend
    ],
    credentials: true
  })
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

/* =========================
   DATABASE
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* =========================
   HEALTH CHECK
========================= */
app.get("/", (req, res) => {
  res.send("Quiz API is running");
});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});