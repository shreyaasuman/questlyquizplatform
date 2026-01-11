import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EnterQuiz from "./pages/EnterQuiz";
import Quiz from "./pages/Quiz";
import Leaderboard from "./pages/Leaderboard";

import AdminCreateQuiz from "./pages/AdminCreateQuiz";
import AdminQuizzes from "./pages/AdminQuizzes";
import EditQuiz from "./pages/EditQuiz";

function App() {
  return (
    <>
      {/* GLOBAL NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED USER ROUTES */}
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

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/create-quiz"
          element={
            <ProtectedRoute>
              <AdminCreateQuiz />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/quizzes"
          element={
            <ProtectedRoute>
              <AdminQuizzes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-quiz"
          element={
            <ProtectedRoute>
              <EditQuiz />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;