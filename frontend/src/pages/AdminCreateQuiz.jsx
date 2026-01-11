import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminCreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: 0
      }
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const submitQuiz = async () => {
    if (!title.trim()) {
      alert("Quiz title is required");
      return;
    }

    for (let q of questions) {
      if (!q.questionText.trim()) {
        alert("All questions must have text");
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert("All options must be filled");
        return;
      }
    }

    try {
      const res = await API.post("/quiz/create", {
        title,
        description,
        questions
      });

      alert(`Quiz created! Code: ${res.data.quizCode}`);
      navigate("/admin/quizzes");
    } catch (error) {
      alert("Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold mb-6 text-center">
          ➕ Create New Quiz
        </h1>

        {/* QUIZ INFO */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Quiz Title"
            className="w-full mb-3 px-4 py-2 border rounded-lg"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Quiz Description (optional)"
            className="w-full px-4 py-2 border rounded-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="mb-6 p-6 border rounded-xl bg-gray-50"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">
                Question {qIndex + 1}
              </h3>
              <button
                onClick={() => removeQuestion(qIndex)}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>

            <input
              type="text"
              placeholder="Question text"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
              value={q.questionText}
              onChange={(e) =>
                updateQuestion(qIndex, "questionText", e.target.value)
              }
            />

            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2 gap-3">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswer === oIndex}
                  onChange={() =>
                    updateQuestion(qIndex, "correctAnswer", oIndex)
                  }
                />
                <input
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  className="flex-1 px-4 py-2 border rounded-lg"
                  value={opt}
                  onChange={(e) =>
                    updateOption(qIndex, oIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          <button
            onClick={addQuestion}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            ➕ Add Question
          </button>

          <button
            onClick={submitQuiz}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg
                       hover:bg-indigo-700 transition"
          >
            🚀 Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminCreateQuiz;