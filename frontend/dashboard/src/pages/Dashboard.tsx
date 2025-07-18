import React from 'react';
import WelcomeMessage from '../components/dashboard/WelcomeMessage';
import CourseProgress from '../components/dashboard/CourseProgress';
import QuizSection from '../components/dashboard/QuizSection';
import Calendar from '../components/dashboard/Calendar';
import UpcomingCourses from '../components/dashboard/UpcomingCourses';
import RecentActivities from '../components/dashboard/RecentActivities';
import {
  currentUser,
  courses,
  quizzes,
  calendarEvents,
  upcomingCourses,
  recentActivities,
} from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Welcome Message */}
      <div className="mb-6">
        <WelcomeMessage user={currentUser} />
      </div>

      {/* Top Section: Progress and Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <CourseProgress courses={courses} />
        </div>
        <div>
          <QuizSection quizzes={quizzes} />
        </div>
      </div>

      {/* Middle Section: Calendar and Upcoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Calendar events={calendarEvents} />
        <UpcomingCourses courses={upcomingCourses} />
      </div>

      {/* Bottom Section: Recent Activities */}
      <div>
        <RecentActivities activities={recentActivities} />
      </div>
    </div>
  );
};

export default Dashboard;
