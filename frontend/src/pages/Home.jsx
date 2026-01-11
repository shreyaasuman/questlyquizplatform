import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
      
      {/* HERO SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">
          Questly 🚀
        </h1>

        <p className="text-xl max-w-2xl mx-auto mb-10 opacity-90">
          Create quizzes, challenge friends, and track scores —  
          all in one modern quiz platform.
        </p>

        <div className="flex justify-center gap-6">
          <button
            onClick={() => navigate("/login")}
            className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold
                       hover:scale-105 transition shadow-lg"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-indigo-900 px-6 py-3 rounded-xl font-semibold
                       hover:scale-105 transition shadow-lg"
          >
            Register
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-white text-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">🧠 Smart Quizzes</h3>
            <p>Create timed quizzes with multiple questions and options.</p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">🏆 Leaderboards</h3>
            <p>See rankings with scores, avatars, and charts.</p>
          </div>

          <div className="p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-3">🎨 Modern UI</h3>
            <p>Clean, aesthetic, responsive design built with Tailwind.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;