import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function EnterQuiz() {
  const [quizCode, setQuizCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEnterQuiz = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        "/quiz/enter",
        { quizCode },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Save quiz data temporarily
      localStorage.setItem("quiz", JSON.stringify(res.data));

      navigate("/quiz");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid quiz code");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          Enter Quiz Code 🧠
        </h2>

        <input
          type="text"
          placeholder="Enter Quiz Code"
          className="w-full mb-4 px-4 py-2 border rounded-lg text-center uppercase tracking-widest"
          value={quizCode}
          onChange={(e) => setQuizCode(e.target.value)}
        />

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <button
          onClick={handleEnterQuiz}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Enter Quiz
        </button>
      </div>
    </div>
  );
}

export default EnterQuiz;