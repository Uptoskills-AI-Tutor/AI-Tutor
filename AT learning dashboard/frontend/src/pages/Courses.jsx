import React, { useState, useMemo } from "react";
import { BookOpen, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { courses as rawCourses } from "../data/Courses";

const Courses = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("title-asc");

  const [courses, setCourses] = useState(() => {
    const safe = Array.isArray(rawCourses) ? rawCourses : [];
    return safe.map((c) => {
      const computed =
        typeof c.progress === "number"
          ? c.progress
          : Math.round(((c.lessonsCompleted || 0) / (c.totalLessons || 1)) * 100);
      return { ...c, progress: computed };
    });
  });

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 40) return "bg-blue-500";
    return "bg-amber-500";
  };

  const handleProgressChange = (id, newProgress) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === id
          ? {
              ...course,
              progress: Number(newProgress),
              lessonsCompleted: Math.round(
                (Number(newProgress) / 100) * course.totalLessons
              ),
            }
          : course
      )
    );
  };

  const filteredAndSorted = useMemo(() => {
    const q = query.toLowerCase();

    const filtered = courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        `${c.lessonsCompleted}/${c.totalLessons}`.includes(q)
    );

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "progress-desc":
          return b.progress - a.progress;
        case "progress-asc":
          return a.progress - b.progress;
        default:
          return 0;
      }
    });

    return sorted;
  }, [courses, query, sortBy]);

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>

        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search courses..."
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="title-asc">Title (A → Z)</option>
            <option value="progress-desc">Progress (High → Low)</option>
            <option value="progress-asc">Progress (Low → High)</option>
          </select>

          <button
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={() => navigate("/app/courses")}
          >
            <span>Browse courses</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Course List */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-sm text-gray-500 border border-gray-100 rounded-md p-4">
          No courses found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSorted.map((course) => (
            <div
              key={course.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <BookOpen size={64} className="text-gray-400" />
              </div>

              <h2 className="text-lg font-semibold mb-1">{course.title}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {course.lessonsCompleted} of {course.totalLessons} lessons completed
              </p>

              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full transition-all duration-300 ${getProgressColor(
                    course.progress
                  )}`}
                  style={{ width: course.progress + "%" }}
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                value={course.progress}
                onChange={(e) =>
                  handleProgressChange(course.id, e.target.value)
                }
                className="w-full mb-2 accent-blue-500"
              />

              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {Number(course.progress).toFixed(0)}% complete
                </span>
                <button
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  onClick={() => navigate(`/app/courses/${course.id}`)}
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;

