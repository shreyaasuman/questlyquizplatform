const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");

const app = express();

/* ======================
   CORS CONFIG (FINAL)
====================== */
const allowedOrigins = [
  "http://localhost:5173",
  "https://questly-frontend.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile browser, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

/* ======================
   MIDDLEWARE
====================== */
app.use(express.json());

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);

app.get("/", (req, res) => {
  res.send("Quiz API is running");
});

/* ======================
   DB + SERVER START
====================== */
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });