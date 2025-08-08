import React from 'react';
import { Link } from 'react-router-dom';
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
      <div className="mb-6 flex justify-between items-center">
        <WelcomeMessage user={currentUser} />
        <Link to="/settings" className="text-blue-600 hover:underline text-sm">
          Edit Profile
        </Link>
      </div>

      {/* Top Section: Progress and Quizzes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <CourseProgress courses={courses} />
          <div className="mt-2 text-right">
            <Link to="/courses" className="text-blue-500 hover:underline text-sm">
              View All Courses
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <QuizSection quizzes={quizzes} />
          <div className="mt-2 text-right">
            <Link to="/analytics" className="text-blue-500 hover:underline text-sm">
              Go to Quiz Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* Middle Section: Calendar and Upcoming */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <Calendar events={calendarEvents} />
          <div className="mt-2 text-right">
            <Link to="/analytics" className="text-blue-500 hover:underline text-sm">
              View Full Calendar
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <UpcomingCourses courses={upcomingCourses} />
          <div className="mt-2 text-right">
            <Link to="/courses" className="text-blue-500 hover:underline text-sm">
              See All Upcoming Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activities */}
      <div className="bg-white rounded-lg shadow p-4">
        <RecentActivities activities={recentActivities} />
        <div className="mt-2 text-right">
          <Link to="/analytics" className="text-blue-500 hover:underline text-sm">
            View Activity Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
