import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await API.get("/quiz/all");
        setQuizzes(res.data);

        // Fetch stats for each quiz
        res.data.forEach(async (quiz) => {
          const statsRes = await API.get(`/quiz/stats/${quiz._id}`);
          setStats((prev) => ({
            ...prev,
            [quiz._id]: statsRes.data
          }));
        });
      } catch (error) {
        alert("Failed to load quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert("Quiz code copied!");
  };

  const deleteQuiz = async (quizId) => {
    if (!window.confirm("Delete this quiz?")) return;

    try {
      await API.delete(`/quiz/${quizId}`);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    } catch (error) {
      alert("Failed to delete quiz");
    }
  };

  const editQuiz = (quizId) => {
    localStorage.setItem("editQuizId", quizId);
    navigate("/admin/edit-quiz");
  };

  const viewResults = (quizId) => {
    localStorage.setItem("quizId", quizId);
    navigate("/leaderboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div
        className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg
                   ring-1 ring-indigo-100"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            🧑‍🏫 Your Quizzes
            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              Admin
            </span>
          </h1>

          {/* CREATE QUIZ */}
          <button
            onClick={() => navigate("/admin/create-quiz")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium
                       transition transform hover:-translate-y-0.5 hover:shadow-lg
                       active:scale-95"
          >
            ➕ Create New Quiz
          </button>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">
            No quizzes created yet
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => {
              const quizStats = stats[quiz._id];

              return (
                <div
                  key={quiz._id}
                  className="rounded-2xl p-6 bg-white/80 backdrop-blur-md
                             border border-gray-200 shadow-md
                             transition transform hover:-translate-y-1 hover:shadow-xl
                             animate-fade-in"
                >
                  <h2 className="text-xl font-semibold mb-2">
                    {quiz.title}
                  </h2>

                  <p className="text-gray-600 mb-2">
                    Code:{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {quiz.quizCode}
                    </span>
                  </p>

                  {/* STATS */}
                  {quizStats && (
                    <div className="flex gap-4 mb-4 flex-wrap">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        🧮 Attempts: {quizStats.attempts}
                      </span>

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        📈 Avg Score: {quizStats.averageScore}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    <button
                      onClick={() => copyCode(quiz.quizCode)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium
                                 transition transform hover:-translate-y-0.5 hover:shadow-lg
                                 active:scale-95"
                    >
                      📋 Copy Code
                    </button>

                    <button
                      onClick={() => editQuiz(quiz._id)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-medium
                                 transition transform hover:-translate-y-0.5 hover:shadow-lg
                                 active:scale-95"
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => viewResults(quiz._id)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium
                                 transition transform hover:-translate-y-0.5 hover:shadow-lg
                                 active:scale-95"
                    >
                      📊 View Results
                    </button>

                    <button
                      onClick={() => deleteQuiz(quiz._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium
                                 transition transform hover:-translate-y-0.5 hover:shadow-lg
                                 active:scale-95"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminQuizzes;