const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    quizCode: {
      type: String,
      unique: true,
      required: true
    },

    // 👇 NEW: who created this quiz (ADMIN)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    questions: [
      {
        questionText: {
          type: String,
          required: true
        },
        options: {
          type: [String],
          required: true
        },
        correctAnswer: {
          type: Number,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true // 👈 adds createdAt & updatedAt automatically
  }
);

module.exports = mongoose.model("Quiz", quizSchema);