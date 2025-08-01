import React, { useMemo, useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  isSameDay,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEK_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function Calendar({
  events = [],
  initialDate = new Date(),
  onDateSelect,
  header = "Calendar",
  subHeader = "Your schedule",
}) {
  const [currentDate, setCurrentDate] = useState(startOfMonth(initialDate));
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const normalizedEvents = useMemo(
    () =>
      events.map((e) => ({
        ...e,
        date: e.date instanceof Date ? e.date : new Date(e.date),
      })),
    [events]
  );

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = getDay(monthStart);

  const gridDays = useMemo(() => {
    const cells = [];
    for (let i = 0; i < startDay; i++) cells.push(null);
    cells.push(...daysInMonth);
    while (cells.length < 42) cells.push(null);
    return cells;
  }, [startDay, daysInMonth]);

  const hasEvent = (day) =>
    day && normalizedEvents.some((ev) => isSameDay(ev.date, day));

  const handleSelectDate = (day) => {
    if (!day) return;
    setSelectedDate(day);
    onDateSelect?.(
      day,
      normalizedEvents.filter((ev) => isSameDay(ev.date, day))
    );
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="bg-white rounded-xl shadow p-6 h-full select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">{header}</h2>
          {subHeader && <p className="text-sm text-gray-500">{subHeader}</p>}
        </div>

        {/* Month navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Previous month"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="text-lg font-medium w-36 text-center">
            {format(currentDate, "MMMM yyyy")}
          </h3>
          <button
            onClick={nextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Next month"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEK_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-sm font-medium text-gray-500"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {gridDays.map((day, i) => {
          if (!day) {
            return <div key={i} className="w-10 h-10 mx-auto" />;
          }

          const isToday = isSameDay(day, new Date());
          const isSelected = isSameDay(day, selectedDate);
          const eventExists = hasEvent(day);

          const base =
            "w-10 h-10 mx-auto flex items-center justify-center rounded-full text-sm transition-colors";
          const todayRing = isToday ? "ring-2 ring-blue-500" : "";
          const selected =
            isSelected ? "bg-blue-600 text-white" : "hover:bg-gray-100";
          const eventDot = eventExists
            ? 'relative after:content-[""] after:w-1.5 after:h-1.5 after:bg-blue-500 after:rounded-full after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2'
            : "";

          return (
            <button
              key={i}
              onClick={() => handleSelectDate(day)}
              className={`${base} ${selected} ${todayRing} ${eventDot}`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>

      {/* Selected Date Info */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-center">
        <p className="text-sm text-gray-700">
          <strong>Course Start Date:</strong>{" "}
          {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "None"}
        </p>
      </div>
    </div>
  );
}
