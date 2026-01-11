const mongoose = require("mongoose");
const Quiz = require("../models/Quiz");
const Result = require("../models/Result");
const generateQuizCode = require("../utils/generateQuizCode");

// ===============================
// CREATE QUIZ (ADMIN)
// ===============================
exports.createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quizCode = generateQuizCode();

    const quiz = await Quiz.create({
      title,
      description,
      quizCode,
      questions
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quizCode: quiz.quizCode
    });
  } catch (error) {
    console.error("CREATE QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ENTER QUIZ (STUDENT)
// ===============================
exports.enterQuiz = async (req, res) => {
  try {
    const { quizCode } = req.body;

    const quiz = await Quiz.findOne({ quizCode });

    if (!quiz) {
      return res.status(404).json({ message: "Invalid quiz code" });
    }

    res.json({
      quizId: quiz._id,
      title: quiz.title,
      description: quiz.description,
      questions: quiz.questions.map((q) => ({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer
      }))
    });
  } catch (error) {
    console.error("ENTER QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// SUBMIT QUIZ (BACKEND SCORING)
// ===============================
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, answers } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let score = 0;

    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });

    await Result.create({
      userId: req.user.id,
      quizId: quiz._id,
      score,
      total: quiz.questions.length
    });

    res.json({
      message: "Quiz submitted",
      score,
      total: quiz.questions.length
    });
  } catch (error) {
    console.error("SUBMIT QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// GET LEADERBOARD (PER QUIZ)
// ===============================
exports.getLeaderboard = async (req, res) => {
  try {
    const { quizId } = req.params;

    const results = await Result.find({
      quizId: new mongoose.Types.ObjectId(quizId)
    })
      // 🔥 THIS IS THE FIX
      .populate("userId", "name avatar")
      .sort({ score: -1 });

    res.json(results);
  } catch (error) {
    console.error("LEADERBOARD ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ===============================
// GET ALL QUIZZES (ADMIN)
// ===============================
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });

    res.json(quizzes);
  } catch (error) {
    console.error("GET QUIZZES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// DELETE QUIZ (ADMIN)
// ===============================
exports.deleteQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;

    await Quiz.findByIdAndDelete(quizId);
    await Result.deleteMany({ quizId });

    res.json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("DELETE QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ===============================
// GET QUIZ STATS (ADMIN)
// ===============================
exports.getQuizStats = async (req, res) => {
  try {
    const { quizId } = req.params;

    const results = await Result.find({ quizId });

    const attempts = results.length;

    let averageScore = 0;

    if (attempts > 0) {
      const totalScore = results.reduce(
        (sum, r) => sum + r.score,
        0
      );
      averageScore = (totalScore / attempts).toFixed(2);
    }

    res.json({
      attempts,
      averageScore
    });
  } catch (error) {
    console.error("QUIZ STATS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ===============================
// GET QUIZ BY ID (ADMIN)
// ===============================
exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("GET QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ===============================
// UPDATE QUIZ (ADMIN)
// ===============================
exports.updateQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, description, questions } = req.body;

    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description, questions },
      { new: true }
    );

    res.json({ message: "Quiz updated successfully", quiz });
  } catch (error) {
    console.error("UPDATE QUIZ ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};