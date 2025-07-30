import React, { useState, useEffect } from 'react';
import '../styles/admin.css';
import UserForm from '../components/UserForm';
import CourseForm from '../components/CourseForm';
import MentorForm from '../components/MentorForm';
import QuizSection from '../components/QuizSection';
import ForumSection from '../components/ForumSection';
import NotificationBox from '../components/NotificationBox';
import Sidebar from '../components/Sidebar'; // ✅ Added Sidebar

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem('admin_users')) || []);
    setCourses(JSON.parse(localStorage.getItem('admin_courses')) || []);
    setMentors(JSON.parse(localStorage.getItem('admin_mentors')) || []);
  }, []);

  useEffect(() => localStorage.setItem('admin_users', JSON.stringify(users)), [users]);
  useEffect(() => localStorage.setItem('admin_courses', JSON.stringify(courses)), [courses]);
  useEffect(() => localStorage.setItem('admin_mentors', JSON.stringify(mentors)), [mentors]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Modules */}
        <section id="user-section" className="mb-10">
          <UserForm users={users} setUsers={setUsers} />
        </section>

        <section id="course-section" className="mb-10">
          <CourseForm courses={courses} setCourses={setCourses} />
        </section>

        <section id="mentor-section" className="mb-10">
          <MentorForm mentors={mentors} setMentors={setMentors} />
        </section>

        <section id="quiz-section" className="mb-10">
          <QuizSection />
        </section>

        <section id="forum-section" className="mb-10">
          <ForumSection />
        </section>

        <section id="notification-section">
          <NotificationBox />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
