const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  quizCode: {
    type: String,
    unique: true
  },
  questions: [
    {
      questionText: String,
      options: [String],
      correctAnswer: Number
    }
  ]
});

module.exports = mongoose.model("Quiz", quizSchema);
