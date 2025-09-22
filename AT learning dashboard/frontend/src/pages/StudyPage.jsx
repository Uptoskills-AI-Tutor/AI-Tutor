// src/pages/StudyPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Clock, CheckCircle, Circle } from "lucide-react";

// 🎯 Dummy data for multiple courses
const courseData = {
  "fullstack": {
    title: "Full Stack Web Development",
    modules: [
      {
        id: 1,
        name: "Module 1: HTML & CSS",
        lessons: [
          {
            id: 1,
            title: "Introduction to HTML & CSS",
            duration: "12 min",
            content: "Learn semantic HTML tags, CSS basics, and building responsive layouts.",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
            keyConcepts: [
              { title: "Semantic HTML", desc: "Meaningful structure.", color: "border-blue-400" },
              { title: "CSS Basics", desc: "Styling pages effectively.", color: "border-green-400" },
            ],
          },
          {
            id: 2,
            title: "Forms & Validation",
            duration: "15 min",
            content: "Explore forms, inputs, and validation.",
            videoUrl: "https://www.youtube.com/embed/2O8pkybH6po",
            keyConcepts: [
              { title: "Forms", desc: "Capturing user input.", color: "border-purple-400" },
              { title: "Validation", desc: "Ensuring correct input.", color: "border-pink-400" },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Module 2: JavaScript",
        lessons: [
          {
            id: 3,
            title: "JavaScript Basics",
            duration: "25 min",
            content: "Variables, functions, and loops in JS.",
            videoUrl: "https://www.youtube.com/embed/W6NZfCO5SIk",
            keyConcepts: [
              { title: "Variables", desc: "Store data in memory.", color: "border-yellow-400" },
              { title: "Functions", desc: "Reusable logic blocks.", color: "border-indigo-400" },
            ],
          },
        ],
      },
    ],
  },

  "gen-ai": {
    title: "Generative AI & Machine Learning Fundamentals",
    modules: [
      {
        id: 1,
        name: "Getting Started with AI",
        lessons: [
          {
            id: 1,
            title: "Intro to Generative AI",
            duration: "18 min",
            content: "Understand how generative AI models like GPT work.",
            videoUrl: "https://www.youtube.com/embed/2ePf9rue1Ao",
            keyConcepts: [
              { title: "Neural Nets", desc: "Core of AI systems.", color: "border-blue-400" },
              { title: "Transformers", desc: "Powering GPT models.", color: "border-orange-400" },
            ],
          },
        ],
      },
    ],
  },

  "data-analytics": {
    title: "Data Analytics Masterclass",
    modules: [
      {
        id: 1,
        name: "Excel & SQL Basics",
        lessons: [
          {
            id: 1,
            title: "Intro to Data Analytics",
            duration: "14 min",
            content: "Learn how data is analyzed using Excel & SQL.",
            videoUrl: "https://www.youtube.com/embed/zt8eE3H5Gao",
            keyConcepts: [
              { title: "Data Cleaning", desc: "Prepare data for analysis.", color: "border-green-400" },
              { title: "SQL Queries", desc: "Extract insights from databases.", color: "border-blue-400" },
            ],
          },
        ],
      },
    ],
  },

  "ml-fundamentals": {
    title: "Machine Learning Fundamentals",
    modules: [
      {
        id: 1,
        name: "Introduction to ML",
        lessons: [
          {
            id: 1,
            title: "What is Machine Learning?",
            duration: "20 min",
            content: "Basics of supervised and unsupervised learning.",
            videoUrl: "https://www.youtube.com/embed/GwIo3gDZCVQ",
            keyConcepts: [
              { title: "Supervised Learning", desc: "Training with labels.", color: "border-red-400" },
              { title: "Unsupervised Learning", desc: "Pattern discovery.", color: "border-purple-400" },
            ],
          },
        ],
      },
    ],
  },

  "react": {
  title: "React Fundamentals",
  modules: [
    {
      id: 1,
      name: "Getting Started with React",
      lessons: [
        {
          id: 1,
          title: "Introduction to React",
          duration: "20 min",
          content: "Learn React components, JSX, and props.",
          videoUrl: "https://www.youtube.com/embed/Ke90Tje7VS0", // ✅ public, embeddable
          keyConcepts: [
            { title: "JSX", desc: "Write HTML in JS.", color: "border-blue-400" },
            { title: "Components", desc: "Reusable UI blocks.", color: "border-green-400" },
          ],
        },
        {
          id: 2,
          title: "State & Props",
          duration: "22 min",
          content: "Manage state and pass data using props.",
          videoUrl: "https://www.youtube.com/embed/UAssn1S0UkU",
          keyConcepts: [
            { title: "State", desc: "Internal component data.", color: "border-yellow-400" },
            { title: "Props", desc: "Pass data between components.", color: "border-purple-400" },
          ],
        },
        {
          id: 3,
          title: "Lifecycle Methods & Hooks",
          duration: "25 min",
          content: "Understand React component lifecycle and useEffect/useState hooks.",
          videoUrl: "https://www.youtube.com/embed/dpw9EHDh2bM", // ✅ public, embeddable
          keyConcepts: [
            { title: "useState Hook", desc: "Manage component state.", color: "border-green-400" },
            { title: "useEffect Hook", desc: "Handle side effects.", color: "border-blue-400" },
          ],
        },
      ],
    },
  ],
},


  "python-ai": {
    title: "Python for AI",
    modules: [
      {
        id: 1,
        name: "Python Basics",
        lessons: [
          {
            id: 1,
            title: "Introduction to Python",
            duration: "15 min",
            content: "Python syntax, variables, and functions.",
            videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
            keyConcepts: [
              { title: "Syntax", desc: "Python language basics.", color: "border-blue-400" },
              { title: "Variables", desc: "Store values.", color: "border-green-400" },
            ],
          },
          {
            id: 2,
            title: "Python for AI",
            duration: "18 min",
            content: "Use Python for AI tasks and libraries.",
            videoUrl: "https://www.youtube.com/embed/gfDE2a7MKjA",
            keyConcepts: [
              { title: "NumPy", desc: "Numerical computing.", color: "border-yellow-400" },
              { title: "Pandas", desc: "Data manipulation.", color: "border-purple-400" },
            ],
          },
        ],
      },
    ],
  },
};

export default function StudyPage() {
  const { id } = useParams();
  const course = courseData[id];

  if (!course) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">Course not found</h1>
        <p className="text-gray-600">Invalid course ID: {id}</p>
      </div>
    );
  }

  const [activeLesson, setActiveLesson] = useState(course.modules[0].lessons[0]);
  const [completedLessons, setCompletedLessons] = useState([]);

  const toggleCompletion = (lessonId) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((lid) => lid !== lessonId) : [...prev, lessonId]
    );
  };

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const progressPercent = Math.round((completedLessons.length / allLessons.length) * 100);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r shadow-sm flex flex-col">
          <div className="flex-1 p-4 overflow-y-auto">
            <h2 className="font-bold text-lg mb-4 text-gray-900">{course.title}</h2>
            {course.modules.map((module) => (
              <div key={module.id} className="mb-4">
                <h3 className="font-semibold text-gray-700 mb-2">{module.name}</h3>
                <ul className="space-y-2">
                  {module.lessons.map((lesson) => {
                    const isActive = activeLesson.id === lesson.id;
                    const isCompleted = completedLessons.includes(lesson.id);
                    return (
                      <li
                        key={lesson.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                          isActive
                            ? "bg-cyan-500 text-white shadow-md"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                        }`}
                      >
                        <div className="flex-1" onClick={() => setActiveLesson(lesson)}>
                          <p className="text-sm font-medium">{lesson.title}</p>
                          <p
                            className={`flex items-center text-xs ${
                              isActive ? "text-white" : "text-gray-600"
                            }`}
                          >
                            <Clock className="w-3 h-3 mr-1" /> {lesson.duration}
                          </p>
                        </div>
                        <button
                          className="ml-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCompletion(lesson.id);
                          }}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="p-4 border-t bg-white">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>
                Progress: {completedLessons.length}/{allLessons.length}
              </span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-6">
            <iframe
              className="w-full h-full"
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              allowFullScreen
            />
          </div>
          <div className="bg-white border-l-4 border-green-400 rounded-lg shadow-sm p-5 mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{activeLesson.title}</h1>
            <p className="text-gray-700 leading-relaxed text-sm">{activeLesson.content}</p>
          </div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900">Key Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeLesson.keyConcepts?.map((concept, idx) => (
              <div key={idx} className={`p-4 bg-white rounded-lg shadow-sm border-l-4 ${concept.color}`}>
                <h3 className="font-semibold text-gray-900 mb-1">{concept.title}</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{concept.desc}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
