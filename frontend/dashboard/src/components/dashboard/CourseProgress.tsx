import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Course } from '../../types';

interface CourseProgressProps {
  courses: Course[];
}

const CourseProgress: React.FC<CourseProgressProps> = ({ courses }) => {
  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-success-500';
    if (progress >= 40) return 'bg-primary-500';
    return 'bg-warning-500';
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Course Progress</h2>
        <p className="text-sm text-gray-500">Track your ongoing courses</p>
      </div>

      <div className="space-y-6">
        {courses.map((course) => (
          <div key={course.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{course.title}</h3>
              <span className="text-sm text-gray-500">
                {course.lessonsCompleted} of {course.totalLessons} lessons completed
              </span>
            </div>
            <div className="progress-bar">
              <div 
                className={`progress-value ${getProgressColor(course.progress)}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm font-medium text-gray-700">
              {course.progress}%
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={18} />
        </button>
        <div className="text-sm text-gray-500">
          Page 1 of 1
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CourseProgress;