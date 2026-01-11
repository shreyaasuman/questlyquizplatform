import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EnterQuiz from "./pages/EnterQuiz";
import Quiz from "./pages/Quiz";
import ProtectedRoute from "./components/ProtectedRoute";
import Leaderboard from "./pages/Leaderboard";
import AdminCreateQuiz from "./pages/AdminCreateQuiz";
import AdminQuizzes from "./pages/AdminQuizzes";
import EditQuiz from "./pages/EditQuiz";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/create-quiz" element={<AdminCreateQuiz />} />
      <Route path="/admin/quizzes" element={<AdminQuizzes />} />
      <Route path="/admin/edit-quiz" element={<EditQuiz />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/enter-quiz"
        element={
          <ProtectedRoute>
            <EnterQuiz />
          </ProtectedRoute>
        }
      />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        }
      />
      <Route
        path="/leaderboard"
        element={
          <ProtectedRoute>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;