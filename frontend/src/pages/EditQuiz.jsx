import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function EditQuiz() {
  const navigate = useNavigate();
  const quizId = localStorage.getItem("editQuizId");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${quizId}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setQuestions(res.data.questions);
      } catch (error) {
        alert("Failed to load quiz");
      }
    };

    fetchQuiz();
  }, [quizId]);

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

  const updateQuiz = async () => {
    try {
      await API.put(`/quiz/${quizId}`, {
        title,
        description,
        questions
      });

      alert("Quiz updated successfully!");
      navigate("/admin/quizzes");
    } catch (error) {
      alert("Failed to update quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          ✏️ Edit Quiz
        </h1>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full mb-6 p-2 border rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6 border p-4 rounded">
            <input
              className="w-full mb-3 p-2 border rounded"
              value={q.questionText}
              onChange={(e) =>
                updateQuestion(qIndex, "questionText", e.target.value)
              }
            />

            {q.options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="radio"
                  checked={q.correctAnswer === i}
                  onChange={() =>
                    updateQuestion(qIndex, "correctAnswer", i)
                  }
                />
                <input
                  className="flex-1 p-2 border rounded"
                  value={opt}
                  onChange={(e) =>
                    updateOption(qIndex, i, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}

        <button
          onClick={updateQuiz}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          💾 Update Quiz
        </button>
      </div>
    </div>
  );
}

export default EditQuiz;