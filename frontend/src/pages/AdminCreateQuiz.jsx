import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function AdminCreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizCode, setQuizCode] = useState("");

  const [questions, setQuestions] = useState([
    {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    }
  ]);

  // ADD QUESTION
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

  // UPDATE QUESTION TEXT
  const updateQuestionText = (index, value) => {
    const updated = [...questions];
    updated[index].questionText = value;
    setQuestions(updated);
  };

  // UPDATE OPTION
  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  // UPDATE CORRECT ANSWER
  const updateCorrectAnswer = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = Number(value);
    setQuestions(updated);
  };

  // CREATE QUIZ (BACKEND)
  const createQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/quiz/create",
        {
          title,
          description,
          questions
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setQuizCode(res.data.quizCode);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          🧑‍🏫 Create New Quiz
        </h1>

        {/* QUIZ DETAILS */}
        <input
          type="text"
          placeholder="Quiz Title"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Quiz Description"
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* QUESTIONS */}
        {questions.map((q, qIndex) => (
          <div
            key={qIndex}
            className="mb-8 p-4 border rounded-xl bg-gray-50"
          >
            <h2 className="font-semibold mb-2">
              Question {qIndex + 1}
            </h2>

            <input
              type="text"
              placeholder="Question text"
              className="w-full mb-3 px-3 py-2 border rounded"
              value={q.questionText}
              onChange={(e) =>
                updateQuestionText(qIndex, e.target.value)
              }
            />

            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correctAnswer === optIndex}
                  onChange={() =>
                    updateCorrectAnswer(qIndex, optIndex)
                  }
                />
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  className="ml-2 w-full px-3 py-2 border rounded"
                  value={opt}
                  onChange={(e) =>
                    updateOption(qIndex, optIndex, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        {/* ACTION BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={addQuestion}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            ➕ Add Question
          </button>

          <button
            onClick={createQuiz}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            🚀 Create Quiz
          </button>
        </div>

        {/* QUIZ CODE DISPLAY */}
        {quizCode && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="font-semibold text-green-800">
              Quiz Created Successfully!
            </p>
            <p className="text-lg mt-2">
              Quiz Code:{" "}
              <span className="font-bold">{quizCode}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCreateQuiz;