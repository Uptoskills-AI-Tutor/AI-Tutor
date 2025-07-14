import React from 'react';
import { Clock } from 'lucide-react';
import { UpcomingCourse } from '../../types';



const UpcomingCourses.FC<UpcomingCoursesProps> = ({ courses }) => {
  return (
    <div className="card h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Upcoming Courses</h2>
        <p className="text-sm text-gray-500">Your scheduled classes</p>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="flex items-start gap-4 border-b border-gray-100 pb-4 last-0">
            <div className="mt-1 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary-600 flex-shrink-0">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="text-sm text-gray-600">
                  {course.date}, {course.time}
                </div>
                <div className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                  {course.duration}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingCourses;