import React, { useState } from 'react';
import { format, addMonths, subMonths, isSameMonth, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarEvent } from '../../types';

interface CalendarProps {
  events: CalendarEvent[];
}

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get day of the week for the first day (0 = Sunday, 6 = Saturday)
  const startDay = getDay(monthStart);
  
  // Generate array for the days
  const days = [];
  for (let i = 0; i < startDay; i++) {
    days.push(null); // Blank spaces for days before the 1st of month
  }
  
  daysInMonth.forEach(day => {
    days.push(day);
  });

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleSelectDate = (day: Date) => {
    setSelectedDate(day);
  };

  const hasEvent = (day: Date) => {
    return events.some(event => isSameDay(event.date, day));
  };

  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <p className="text-sm text-gray-500">Your schedule</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <h3 className="text-lg font-medium">
          {format(currentDate, 'MMMM yyyy')}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, i) => (
          <div key={i} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div key={i} className="text-center">
            {day ? (
              <button
                className={`calendar-day ${
                  isSameDay(day, new Date()) ? 'today' : ''
                } ${isSameDay(day, selectedDate) ? 'selected' : ''} ${
                  hasEvent(day) ? 'has-event' : ''
                }`}
                onClick={() => handleSelectDate(day)}
              >
                {format(day, 'd')}
              </button>
            ) : (
              <div className="w-10 h-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;