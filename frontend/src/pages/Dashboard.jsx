import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goToAdminPanel = () => {
    navigate("/admin/quizzes");
  };

  const upgradeToAdmin = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/upgrade`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Upgrade failed");
        return;
      }

      // 🔥 SAVE NEW ADMIN TOKEN + USER
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("🎉 You are now an Admin!");

      // Re-render app with new role + token
      window.location.reload();
    } catch (error) {
      alert("Upgrade failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
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
              <span
                className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
                  user?.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user?.role === "admin" ? "Admin" : "User"}
              </span>
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

        {/* ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ENTER QUIZ */}
          <div className="p-6 border rounded-xl hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">🎯 Enter Quiz</h2>
            <p className="text-gray-600 mb-4">
              Join a quiz using a unique quiz code.
            </p>
            <button
              onClick={() => navigate("/enter-quiz")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg
                         transition transform hover:-translate-y-0.5 hover:shadow-lg
                         active:scale-95"
            >
              Enter Quiz
            </button>
          </div>

          {/* ADMIN / UPGRADE */}
          {user?.role === "admin" ? (
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">🧑‍🏫 Admin Panel</h2>
              <p className="text-gray-600 mb-4">
                Manage quizzes you have created.
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
          ) : (
            <div className="p-6 border rounded-xl hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">✨ Create Quizzes</h2>
              <p className="text-gray-600 mb-4">
                Want to create your own quizzes?
              </p>
              <button
                onClick={upgradeToAdmin}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg
                           transition transform hover:-translate-y-0.5 hover:shadow-lg
                           active:scale-95"
              >
                Upgrade to Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
