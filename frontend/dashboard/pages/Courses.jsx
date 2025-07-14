import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';
import { courses } from '../data/mockData';

const Courses.FC = () => {
  const getProgressColor = (progress) => {
    if (progress >= 75) return 'bg-success-500';
    if (progress >= 40) return 'bg-primary-500';
    return 'bg-warning-500';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Courses</h1>
        <button className="btn btn-primary flex items-center gap-2">
          <span>Browse courses</span>
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md-cols-2 lg-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover-md transition-shadow">
            <div className="h-40 bg-gray-200 rounded-t-lg flex items-center justify-center mb-4 overflow-hidden">
              <BookOpen size={64} className="text-gray-400" />
            </div>
            
            <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
            <p className="text-sm text-gray-500 mb-4">
              {course.lessonsCompleted} of {course.totalLessons} lessons completed
            </p>
            
            <div className="progress-bar mb-2">
              <div 
                className={`progress-value ${getProgressColor(course.progress)}`}
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{course.progress}% complete</span>
              <button className="text-primary-600 hover-primary-700 text-sm font-medium">
                Continue
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;