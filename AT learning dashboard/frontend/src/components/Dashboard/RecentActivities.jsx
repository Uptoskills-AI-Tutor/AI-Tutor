import React, { useMemo, useState } from "react";
import {
  BookOpen,
  FileCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  parseISO,
  isValid,
  format,
  formatDistanceToNow,
  compareDesc,
} from "date-fns";

const ICONS = {
  quiz: Zap,
  lesson: BookOpen,
  assignment: FileCheck,
  default: BookOpen,
};

const BG = {
  quiz: "bg-blue-500",
  lesson: "bg-green-500",
  assignment: "bg-yellow-500",
  default: "bg-gray-500",
};

function normalizeDate(input) {
  if (!input) return null;
  if (input instanceof Date) return input;
  const parsed = parseISO(input);
  return isValid(parsed) ? parsed : null;
}

export default function RecentActivities({
  activities = [],
  pageSize = 6,
  onActivityClick,
  showRelativeTime = true,
}) {
  const [page, setPage] = useState(1);

  // Normalize + sort (newest first)
  const normalized = useMemo(() => {
    return activities
      .map((a) => {
        const at = normalizeDate(a.at) || // prefer a single datetime field if present
                  normalizeDate(a.dateTime) ||
                  normalizeDate(`${a.date ?? ""}T${a.time ?? "00:00"}`);
        return { ...a, at };
      })
      .sort((a, b) => compareDesc(a.at ?? 0, b.at ?? 0));
  }, [activities]);

  const totalPages = Math.max(1, Math.ceil(normalized.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageItems = normalized.slice(start, start + pageSize);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const renderWhen = (at, fallbackDate, fallbackTime) => {
    if (!at) {
      // legacy support if you only pass date + time strings
      return `${fallbackDate ?? ""}${fallbackTime ? `, ${fallbackTime}` : ""}`;
    }
    if (showRelativeTime) {
      return `${formatDistanceToNow(at, { addSuffix: true })} • ${format(
        at,
        "PPpp"
      )}`;
    }
    return format(at, "PPpp");
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Recent Activities</h2>
          <p className="text-sm text-gray-500">Your latest learning activities</p>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
              onClick={goPrev}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-500">
              {page} / {totalPages}
            </span>
            <button
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-40"
              onClick={goNext}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {pageItems.length > 0 ? (
          pageItems.map((activity) => {
            const Icon =
              ICONS[activity.type] ?? ICONS.default;
            const bg =
              BG[activity.type] ?? BG.default;

            const clickable = typeof onActivityClick === "function";

            const Wrapper = ({ children }) =>
              clickable ? (
                <button
                  onClick={() => onActivityClick(activity)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onActivityClick(activity);
                    }
                  }}
                  className="w-full text-left focus:outline-none focus-visible:ring rounded"
                >
                  {children}
                </button>
              ) : (
                <div>{children}</div>
              );

            return (
              <Wrapper key={activity.id}>
                <div
                  className={`flex items-start gap-4 ${
                    clickable ? "hover:bg-gray-50 p-2 rounded-md" : ""
                  }`}
                >
                  <div
                    className={`min-w-8 w-8 h-8 flex items-center justify-center text-white rounded ${bg}`}
                  >
                    <Icon size={18} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-gray-500">
                      {renderWhen(activity.at, activity.date, activity.time)}
                    </p>

                    {/* Optional extra info */}
                    {activity.details && (
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {activity.details}
                      </p>
                    )}
                  </div>

                  {/* Score chip */}
                  {activity.score !== undefined && (
                    <div
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        activity.score >= 90
                          ? "bg-green-100 text-green-800"
                          : activity.score >= 70
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.score}%
                    </div>
                  )}

                  {/* Status chip */}
                  {activity.status && (
                    <div
                      className={`text-sm font-medium px-2 py-1 rounded ${
                        activity.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : activity.status === "in-progress"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {activity.status.replace("-", " ")}
                    </div>
                  )}
                </div>
              </Wrapper>
            );
          })
        ) : (
          <div className="text-sm text-gray-500 text-center py-4">
            No recent activities.
          </div>
        )}
      </div>
    </div>
  );
}

