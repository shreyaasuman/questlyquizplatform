import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";

function Leaderboard() {
  const [results, setResults] = useState([]);
  const [view, setView] = useState("chart");
  const [quizTitle, setQuizTitle] = useState("");

  const quizId = localStorage.getItem("quizId");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const token = localStorage.getItem("token");

        // 🔹 Fetch leaderboard results
        const res = await fetch(
          `http://localhost:5000/api/quiz/leaderboard/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await res.json();

        // ✅ sort by score (desc)
        const sorted = data.sort((a, b) => b.score - a.score);

        const formatted = sorted.map((r) => ({
          name: r.userId.name,
          avatar: r.userId.avatar,
          score: r.score,
          total: r.total
        }));

        setResults(formatted);

        // 🔹 Fetch quiz info (for title)
        const quizRes = await fetch(
          `http://localhost:5000/api/quiz/${quizId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const quizData = await quizRes.json();
        setQuizTitle(quizData.title);

      } catch (error) {
        alert("Failed to load leaderboard");
      }
    };

    fetchLeaderboard();
  }, [quizId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-xl animate-fade-in">

        {/* TITLE */}
        <h1 className="text-3xl font-bold mb-2 text-center">
          🏆 Leaderboard
        </h1>

        {quizTitle && (
          <p className="text-center text-gray-500 mb-6">
            Quiz: <span className="font-semibold">{quizTitle}</span>
          </p>
        )}

        {/* TOGGLE */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView("chart")}
            className={`px-4 py-2 rounded-lg transition ${
              view === "chart"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📊 Chart
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg transition ${
              view === "table"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📋 Table
          </button>
        </div>

        {/* CHART VIEW */}
        {view === "chart" && (
          <>
            <div className="w-full h-96">
              <ResponsiveContainer>
                <BarChart data={results}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]}>
                    <LabelList dataKey="score" position="top" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AVATARS */}
            <div className="flex justify-around mt-6">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center animate-fade-in"
                >
                  <img
                    src={r.avatar}
                    alt="avatar"
                    className="w-12 h-12 rounded-full border mb-1"
                  />
                  <span className="text-sm font-medium">
                    {r.name}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* TABLE VIEW */}
        {view === "table" && (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3">Rank</th>
                <th className="p-3">User</th>
                <th className="p-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, index) => (
                <tr
                  key={index}
                  className="text-center border-t hover:bg-gray-50"
                >
                  <td className="p-3 font-semibold">
                    #{index + 1}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={r.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border"
                      />
                      <span>{r.name}</span>
                    </div>
                  </td>
                  <td className="p-3 font-medium">
                    {r.score}/{r.total}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;