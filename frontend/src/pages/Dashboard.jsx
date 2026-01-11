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

  const goToAdminPanel = () => {
    if (user?.role === "admin") {
      navigate("/admin/quizzes");
    } else {
      alert("You are not an admin yet. Upgrade to create quizzes.");
    }
  };

  // 🚀 UPGRADE TO ADMIN
  const upgradeToAdmin = async () => {
    if (!window.confirm("Upgrade to Admin and start creating quizzes?")) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/auth/upgrade", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upgrade failed");
        return;
      }

      alert(data.message);
      logout(); // force re-login to refresh role
    } catch (error) {
      alert("Server error while upgrading");
    }
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
            className="bg-red-500 text-white px-4 py-2 rounded-lg
                       transition transform hover:-translate-y-0.5 hover:shadow-lg
                       active:scale-95"
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
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg
                         transition transform hover:-translate-y-0.5 hover:shadow-lg
                         active:scale-95"
            >
              Go to Enter Quiz
            </button>
          </div>

          {/* ADMIN PANEL CARD */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Admin Panel</h2>
            <p className="text-gray-600 mb-4">
              Create and manage quizzes (admin only).
            </p>

            <button
              onClick={goToAdminPanel}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg
                         transition transform hover:-translate-y-0.5 hover:shadow-lg
                         active:scale-95"
            >
              Go to Admin Panel
            </button>
          </div>

        </div>

        {/* 🚀 UPGRADE SECTION (ONLY FOR NORMAL USERS) */}
        {user?.role === "user" && (
          <div className="mt-8 p-6 bg-indigo-50 rounded-xl text-center">
            <p className="text-gray-700 mb-3">
              Want to create quizzes too?
            </p>
            <button
              onClick={upgradeToAdmin}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg
                         transition transform hover:-translate-y-0.5 hover:shadow-lg
                         active:scale-95"
            >
              🚀 Become a Quiz Creator
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;