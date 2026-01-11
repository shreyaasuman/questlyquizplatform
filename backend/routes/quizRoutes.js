const express = require("express");
const router = express.Router();

const Quiz = require("../models/Quiz");
const authMiddleware = require("../middleware/authMiddleware");
const { getLeaderboard } = require("../controllers/quizController");
const { isAdmin } = require("../middleware/authMiddleware");
const { createQuiz } = require("../controllers/quizController");
const { submitQuiz } = require("../controllers/quizController");
const { getAllQuizzes } = require("../controllers/quizController");
const { deleteQuiz } = require("../controllers/quizController");
const { getQuizStats } = require("../controllers/quizController");
const {
  getQuizById,
  updateQuiz
} = require("../controllers/quizController");

// CREATE QUIZ (ADMIN ONLY)
router.post("/create", authMiddleware, isAdmin, createQuiz);
router.post("/submit", authMiddleware, submitQuiz);
router.get("/all", authMiddleware, isAdmin, getAllQuizzes);
router.delete("/:quizId", authMiddleware, isAdmin, deleteQuiz);
router.get("/stats/:quizId", authMiddleware, isAdmin, getQuizStats);
router.get("/:quizId", authMiddleware, isAdmin, getQuizById);
router.put("/:quizId", authMiddleware, isAdmin, updateQuiz);

router.get(
  "/leaderboard/:quizId",
  authMiddleware,
  getLeaderboard
);

// ENTER QUIZ BY CODE (LOGGED-IN USERS)
router.post("/enter", authMiddleware, async (req, res) => {
  const { quizCode } = req.body;

  const quiz = await Quiz.findOne({ quizCode });

  if (!quiz) {
    return res.status(404).json({ message: "Invalid quiz code" });
  }

  res.json({
    quizId: quiz._id,
    title: quiz.title,
    description: quiz.description,
    questions: quiz.questions.map(q => ({
      questionText: q.questionText,
      options: q.options
    }))
  });
});

module.exports = router;
