import React from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

const QuizSection = ({ quizzes = [] }) => {
  const getScoreBadgeClasses = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 70) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Quiz</h2>
        <p className="text-sm text-gray-500">Your latest quizzes</p>
      </div>

      <div className="space-y-4">
        {quizzes.slice(0, 3).map((quiz) => (
          <div
            key={quiz.id}
            className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <BookOpen size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{quiz.title}</h3>
                <p className="text-sm text-gray-500">
                  {quiz.date}, {quiz.time}
                </p>
              </div>
              <div
                className={`text-sm font-medium px-2 py-1 rounded ${getScoreBadgeClasses(
                  quiz.score
                )}`}
              >
                {quiz.score}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <div className="text-sm text-gray-500">Page 1 of 2</div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default QuizSection;
