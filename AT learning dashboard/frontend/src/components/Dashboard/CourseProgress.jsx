import React, { useMemo, useState, useEffect, useId } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const CourseProgress = ({ courses = [], pageSize = 5, onCourseClick }) => {
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);
  const baseId = useId();

  // Normalize courses + compute progress if missing
  const normalizedCourses = useMemo(() => {
    const arr = Array.isArray(courses) ? courses : [];
    return arr.map((c) => {
      const progress =
        typeof c.progress === "number"
          ? c.progress
          : Math.round(
              ((c.lessonsCompleted || 0) / (c.totalLessons || 1)) * 100
            );
      return { ...c, progress };
    });
  }, [courses]);

  const pages = Math.max(1, Math.ceil(normalizedCourses.length / pageSize));

  const pageCourses = useMemo(() => {
    const start = (page - 1) * pageSize;
    return normalizedCourses.slice(start, start + pageSize);
  }, [normalizedCourses, page, pageSize]);

  // If the incoming courses/pageSize change, keep page in range
  useEffect(() => {
    setPage((p) => Math.min(Math.max(1, p), pages));
  }, [pages, pageSize, normalizedCourses.length]);

  const getProgressColor = (progress) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 40) return "bg-blue-500";
    return "bg-yellow-500";
  };

  const handleRowClick = (course) => {
    if (onCourseClick) {
      onCourseClick(course);
      return;
    }
    setExpandedId((prev) => (prev === course.id ? null : course.id));
  };

  const handleKeyDown = (e, course) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleRowClick(course);
    }
  };

  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(pages, p + 1));

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Course Progress</h2>
          <p className="text-sm text-gray-500">Track your ongoing courses</p>
        </div>
      </div>

      {normalizedCourses.length === 0 ? (
        <p className="text-sm text-gray-500">No courses yet.</p>
      ) : (
        <div className="space-y-6">
          {pageCourses.map((course) => {
            const isExpanded = expandedId === course.id;
            const panelId = `${baseId}-panel-${course.id}`;
            return (
              <div key={course.id} className="space-y-2">
                {/* Clickable header */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-controls={panelId}
                  onClick={() => handleRowClick(course)}
                  onKeyDown={(e) => handleKeyDown(e, course)}
                  className="flex justify-between items-center cursor-pointer group"
                >
                  <h3 className="font-medium flex items-center gap-2">
                    {course.title}
                    {isExpanded ? (
                      <ChevronUp
                        size={16}
                        className="text-gray-400 group-hover:text-gray-600"
                      />
                    ) : (
                      <ChevronDown
                        size={16}
                        className="text-gray-400 group-hover:text-gray-600"
                      />
                    )}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {course.lessonsCompleted} of {course.totalLessons} lessons
                    completed
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(
                      course.progress
                    )} transition-all`}
                    style={{ width: `${course.progress}%` }}
                  />
                </div>

                <div className="text-right text-sm font-medium text-gray-700">
                  {course.progress}%
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div
                    id={panelId}
                    className="mt-3 rounded-lg border p-4 bg-gray-50 text-sm"
                  >
                    {course.description && (
                      <p className="mb-3 text-gray-700">{course.description}</p>
                    )}

                    <ul className="space-y-1 text-gray-600">
                      {course.instructor && (
                        <li>
                          <span className="font-medium text-gray-700">
                            Instructor:
                          </span>{" "}
                          {course.instructor}
                        </li>
                      )}
                      {course.category && (
                        <li>
                          <span className="font-medium text-gray-700">
                            Category:
                          </span>{" "}
                          {course.category}
                        </li>
                      )}
                      {course.nextLesson && (
                        <li>
                          <span className="font-medium text-gray-700">
                            Next lesson:
                          </span>{" "}
                          {course.nextLesson.title} (
                          {new Date(
                            course.nextLesson.date
                          ).toLocaleString()}
                          )
                        </li>
                      )}
                      {course.deadline && (
                        <li>
                          <span className="font-medium text-gray-700">
                            Deadline:
                          </span>{" "}
                          {new Date(course.deadline).toLocaleDateString()}
                        </li>
                      )}
                      {course.status && (
                        <li>
                          <span className="font-medium text-gray-700">
                            Status:
                          </span>{" "}
                          {course.status}
                        </li>
                      )}
                      {Array.isArray(course.tags) && course.tags.length > 0 && (
                        <li className="flex items-start gap-2">
                          <span className="font-medium text-gray-700">
                            Tags:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {course.tags.map((t) => (
                              <span
                                key={t}
                                className="px-2 py-0.5 rounded-full bg-gray-200 text-gray-700 text-xs"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </li>
                      )}
                    </ul>

                    {/* Notes / Resources */}
                    {Array.isArray(course.resources) &&
                      course.resources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {course.resources.map((r, i) => (
                            <a
                              key={i}
                              href={r.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700"
                            >
                              {r.label || "Resource"} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    {!course.resources && course.notesLink && (
                      <div className="mt-3">
                        <a
                          href={course.notesLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700"
                        >
                          View Notes ↗
                        </a>
                      </div>
                    )}

                    <div className="flex gap-2 mt-4">
                      {course.continueUrl && (
                        <a
                          href={course.continueUrl}
                          className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
                        >
                          Continue
                        </a>
                      )}
                      {course.syllabusUrl && (
                        <a
                          href={course.syllabusUrl}
                          className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
                        >
                          View syllabus
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <button
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
            disabled={page === 1}
            onClick={prevPage}
          >
          <ChevronLeft size={18} />
          </button>
          <div className="text-sm text-gray-500">
            Page {page} of {pages}
          </div>
          <button
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
            disabled={page === pages}
            onClick={nextPage}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseProgress;

