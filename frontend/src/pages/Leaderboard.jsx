import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Leaderboard() {
  const [results, setResults] = useState([]);
  const [view, setView] = useState("chart");
  const quizId = localStorage.getItem("quizId");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `http://localhost:5000/api/quiz/leaderboard/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setResults(
        data.map((r) => ({
          name: r.userId.name,
          avatar: r.userId.avatar, // PNG URL
          score: r.score,
          total: r.total
        }))
      );
    };

    fetchLeaderboard();
  }, [quizId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🏆 Leaderboard
        </h1>

        {/* TOGGLE */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setView("chart")}
            className={`px-4 py-2 rounded-lg ${
              view === "chart"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📊 Chart View
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-4 py-2 rounded-lg ${
              view === "table"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
          >
            📋 Table View
          </button>
        </div>

        {/* CHART VIEW */}
        {view === "chart" && (
          <div className="w-full h-96">
            <ResponsiveContainer>
              <BarChart data={results}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />

                <Bar
                  dataKey="score"
                  fill="#6366f1"
                  label={({ x, y, width, index }) => {
                    const user = results[index];
                    return (
                      <g>
                        <image
                          href={user.avatar}
                          x={x + width / 2 - 20}
                          y={y - 45}
                          width="40"
                          height="40"
                          clipPath="circle(20px at 20px 20px)"
                        />
                      </g>
                    );
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* TABLE VIEW */}
        {view === "table" && (
          <table className="w-full border">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-2">Rank</th>
                <th className="p-2">User</th>
                <th className="p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={r.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full border"
                      />
                      <span>{r.name}</span>
                    </div>
                  </td>
                  <td className="p-2">
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