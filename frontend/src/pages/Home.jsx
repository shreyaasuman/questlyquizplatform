import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl max-w-4xl w-full p-10 text-center animate-fade-in">
        
        {/* LOGO / NAME */}
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">
          Questly ✨
        </h1>

        {/* TAGLINE */}
        <p className="text-xl text-gray-700 mb-6">
          Create. Attempt. Compete.
        </p>

        {/* DESCRIPTION */}
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          <span className="font-semibold">Questly</span> is an interactive quiz
          platform where admins can create smart quizzes and students can
          attempt them using a unique quiz code. Track scores, view leaderboards,
          and learn in a fun, competitive way.
        </p>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-lg font-medium
                       transition transform hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            🔐 Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-8 py-3 bg-white border-2 border-indigo-600 text-indigo-600 rounded-xl text-lg font-medium
                       transition transform hover:-translate-y-1 hover:shadow-xl active:scale-95"
          >
            📝 Register
          </button>
        </div>

        {/* FOOTER TEXT */}
        <p className="mt-10 text-sm text-gray-500">
          Built with ❤️ using MERN Stack
        </p>
      </div>
    </div>
  );
}

export default Home;