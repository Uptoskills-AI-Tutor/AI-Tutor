// src/components/Dashboard/Dashboard1.jsx
import React from "react";
import "./Dashboard1.css";

// Components
import WelcomeMessage from "./WelcomeMessage";
import CourseProgress from "./CourseProgress";
import Calendar from "./Calendar";
import UpcomingCourses from "./UpcomingCourses";
import AnalyticsActivities from "./AnalyticsActivities"; // ✅ Analytics Summary
import DiscussionOverview from "./DiscussionOverview";   // ✅ Discussion Summary
import VideoSummary from "./VideoSummary";               // ✅ NEW: Video Summary

// Import mock data safely
import * as mockData from "../../data/mockData";

const {
  currentUser = { name: "Learner", email: "student@example.com" },
  courses = [],
  calendarEvents = [],
  upcomingCourses = [],
} = mockData;

const Dashboard1 = () => {
  return (
    <div className="dashboard-container p-4">
      {/* Welcome Section */}
      <section className="welcome-section mb-6">
        <div className="dashboard-card">
          <WelcomeMessage user={currentUser} />
        </div>
      </section>

      {/* Course Progress */}
      <section className="mb-6">
        <h2 className="dashboard-section-title">Course Progress</h2>
        <div className="dashboard-card">
          <CourseProgress courses={courses} />
        </div>
      </section>

      {/* Calendar & Upcoming Courses */}
      <section className="mb-6">
        <div className="dashboard-grid dashboard-grid-2">
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Calendar</h2>
            <Calendar events={calendarEvents} />
          </div>
          <div className="dashboard-card">
            <h2 className="dashboard-section-title">Upcoming Courses</h2>
            <UpcomingCourses courses={upcomingCourses} />
          </div>
        </div>
      </section>

      {/* Analytics Overview */}
      <section className="analytics-section mb-6">
        <h2 className="dashboard-section-title">Analytics Overview</h2>
        <div className="dashboard-card">
          <AnalyticsActivities />
        </div>
      </section>

      {/* Discussion Overview */}
      <section className="discussion-overview-section mb-6">
        <h2 className="dashboard-section-title">Discussion Summary</h2>
        <div className="dashboard-card">
          <DiscussionOverview />
        </div>
      </section>

      {/* ✅ Video Summary Section */}
      <section className="video-summary-section mb-6">
        <h2 className="dashboard-section-title">Video Summary</h2>
        <div className="dashboard-card">
          <VideoSummary />
        </div>
      </section>
    </div>
  );
};

export default Dashboard1;




