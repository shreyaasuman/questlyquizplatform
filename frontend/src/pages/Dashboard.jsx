import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // ✅ Get user info (name, avatar, role)
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user?.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full border"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Welcome, {user?.name} 👋
              </h1>
              <p className="text-sm text-gray-500 capitalize">
                Role: {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <p className="text-gray-600 mb-8">
          Choose an action below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ENTER QUIZ CARD */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Enter Quiz</h2>
            <p className="text-gray-600 mb-4">
              Enter a quiz using a unique quiz code.
            </p>

            <button
              onClick={() => navigate("/enter-quiz")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Go to Enter Quiz
            </button>
          </div>

          {/* ADMIN PANEL CARD */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
            <p className="text-gray-600">
              Create and manage quizzes (admin only).
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;