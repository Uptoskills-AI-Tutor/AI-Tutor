import React, { useMemo, useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import {
  parseISO,
  isValid,
  format,
  formatDistanceToNow,
  compareAsc,
  addMinutes,
  isAfter,
} from "date-fns";
import { useNavigate } from "react-router-dom";

function normalizeDate(date, time) {
  if (date instanceof Date) return date;
  if (typeof date === "string" && time) {
    const parsed = parseISO(`${date}T${time}`);
    return isValid(parsed) ? parsed : null;
  }
  if (typeof date === "string") {
    const parsed = parseISO(date);
    return isValid(parsed) ? parsed : null;
  }
  return null;
}

export default function UpcomingCourses({
  courses = [],
  pageSize = 6,
  showPast = false, // hide past classes by default
  joinEnableMinutesBefore = 15,
  showRelativeTime = true,
}) {
  const [page, setPage] = useState(1);
  const navigate = useNavigate(); // ✅ For navigation

  const now = new Date();

  const normalized = useMemo(() => {
    const list = courses
      .map((c) => {
        const startAt =
          c.startAt instanceof Date
            ? c.startAt
            : typeof c.startAt === "string"
            ? parseISO(c.startAt)
            : normalizeDate(c.date, c.time);

        return { ...c, startAt: isValid(startAt) ? startAt : null };
      })
      .filter((c) => (showPast ? true : !c.startAt || c.startAt >= now))
      .sort((a, b) => compareAsc(a.startAt ?? 0, b.startAt ?? 0));
    return list;
  }, [courses, showPast, now]);

  const totalPages = Math.max(1, Math.ceil(normalized.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = normalized.slice(start, start + pageSize);

  const canJoin = (course) => {
    if (!course.joinUrl || !course.startAt) return false;
    const threshold = addMinutes(course.startAt, -joinEnableMinutesBefore);
    return isAfter(now, threshold);
  };

  const renderWhen = (startAt, fallbackDate, fallbackTime) => {
    if (!startAt) {
      return `${fallbackDate ?? ""}${fallbackTime ? `, ${fallbackTime}` : ""}`;
    }
    const abs = format(startAt, "PPpp");
    return showRelativeTime
      ? `${formatDistanceToNow(startAt, { addSuffix: true })} • ${abs}`
      : abs;
  };

  const handleClick = (course) => {
    // ✅ Navigate to the courses page
    navigate("/app/courses");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Upcoming Courses</h2>
          <p className="text-sm text-gray-500">Your scheduled classes</p>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-500">
              {page} / {totalPages}
            </span>
            <button
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {pageItems.length > 0 ? (
          pageItems.map((course) => {
            const joinAllowed = canJoin(course);

            return (
              <div
                key={course.id}
                className={`flex items-start gap-4 border-b border-gray-100 pb-4 last:border-0 cursor-pointer hover:bg-gray-50 rounded p-2 -m-2`}
                onClick={() => handleClick(course)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleClick(course);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Clock size={18} />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium">{course.title}</h3>

                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <div className="text-sm text-gray-600">
                      {renderWhen(course.startAt, course.date, course.time)}
                    </div>

                    {course.duration && (
                      <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                        {course.duration}
                      </div>
                    )}

                    {course.instructor && (
                      <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                        {course.instructor}
                      </div>
                    )}
                  </div>

                  {course.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {course.description}
                    </p>
                  )}
                </div>

                {course.joinUrl && (
                  <a
                    href={course.joinUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className={`flex items-center gap-1 text-sm px-3 py-1.5 rounded ${
                      joinAllowed
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                    aria-disabled={!joinAllowed}
                  >
                    Join <ExternalLink size={14} />
                  </a>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            No upcoming courses.
          </div>
        )}
      </div>
    </div>
  );
}

