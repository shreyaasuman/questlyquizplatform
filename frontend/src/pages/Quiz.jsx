import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Quiz() {
  const navigate = useNavigate();
  const quiz = JSON.parse(localStorage.getItem("quiz"));

  const [timeLeft, setTimeLeft] = useState(300);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!quiz) return;

    if (timeLeft === 0 && !submitted) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No quiz loaded
      </div>
    );
  }

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // store OPTION INDEX
  const selectAnswer = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  // ✅ SUBMIT QUIZ (FIXED)
  const submitQuiz = async () => {
    try {
      if (submitted) return;
      setSubmitted(true);

      const res = await API.post("/quiz/submit", {
        quizId: quiz.quizId,
        answers
      });

      alert(
        `Quiz submitted! Your score: ${res.data.score}/${res.data.totalQuestions}`
      );

      // store quizId for leaderboard
      localStorage.setItem("quizId", quiz.quizId);

      navigate("/leaderboard");
    } catch (error) {
      alert("Error submitting quiz");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-semibold">
            ⏱️ {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        {/* QUESTIONS */}
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-6">
            <h3 className="font-semibold mb-3">
              {qIndex + 1}. {q.questionText}
            </h3>

            <ul className="space-y-2">
              {q.options.map((opt, i) => (
                <li
                  key={i}
                  onClick={() => selectAnswer(qIndex, i)}
                  className={`border px-4 py-2 rounded cursor-pointer transition
                    ${
                      answers[qIndex] === i
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-indigo-50"
                    }`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={submitQuiz}
          className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}

export default Quiz;