import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Users, BookOpen, UserCircle, HelpCircle, MessageCircle,
  Bell, FileQuestion, CheckCircle
} from "lucide-react";

export default function AdminDashboard({ darkMode }) {
  const [pendingDoubtCount, setPendingDoubtCount] = useState(0);
  const [resolvedDoubtCount, setResolvedDoubtCount] = useState(0);

  const fetchPendingDoubts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doubts/pending/count');
      setPendingDoubtCount(res.data.count);
    } catch (error) {
      console.error('❌ Failed to fetch pending doubts:', error);
    }
  };

  const fetchResolvedDoubts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/doubts/resolved/count');
      setResolvedDoubtCount(res.data.count);
    } catch (error) {
      console.error('❌ Failed to fetch resolved doubts:', error);
    }
  };

  useEffect(() => {
    fetchPendingDoubts();
    fetchResolvedDoubts();
  }, []);

  const styles = {
    container: {
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    },
    title: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: darkMode ? '#ffee58' : '#111827'
    },
    cardsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '16px'
    },
    card: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: darkMode ? '#3e006b' : '#f4f6fa',
      boxShadow: darkMode
        ? '0 2px 8px rgba(255, 235, 59, 0.15)'
        : '0 2px 8px rgba(0,0,0,0.1)',
      flex: '1 1 30%'
    },
    icon: {
      width: '32px',
      height: '32px',
      color: darkMode ? '#a78bfa' : '#2563eb'
    },
    label: {
      fontSize: '14px',
      color: darkMode ? '#d1d5db' : '#555'
    },
    value: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: darkMode ? '#ffffff' : '#111827'
    },
    sections: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '32px'
    },
    section: {
      flex: '1 1 45%',
      padding: '16px',
      borderRadius: '10px',
      backgroundColor: darkMode ? '#3e006b' : '#fff',
      border: '1px solid',
      borderColor: darkMode ? '#5f00a3' : '#ddd',
    },
    sectionTitle: {
      marginBottom: '8px',
      fontSize: '18px',
      fontWeight: '600',
      color: darkMode ? '#ffee58' : '#111827'
    },
    sectionList: {
      listStyle: 'disc',
      paddingLeft: '20px',
      fontSize: '14px',
      color: darkMode ? '#e5e7eb' : '#374151'
    }
  };

  const DashboardCard = ({ icon: Icon, label, value }) => (
    <div style={styles.card}>
      <Icon style={styles.icon} />
      <div>
        <p style={styles.label}>{label}</p>
        <p style={styles.value}>{value}</p>
      </div>
    </div>
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌟 Admin Dashboard</h1>

      <div style={styles.cardsContainer}>
        <DashboardCard icon={Users} label="Total Users" value="1,023" />
        <DashboardCard icon={BookOpen} label="Courses" value="38" />
        <DashboardCard icon={UserCircle} label="Mentors" value="12" />
        <DashboardCard icon={HelpCircle} label="Quizzes" value="94" />
        <DashboardCard icon={MessageCircle} label="Feedback" value="254" />
        <DashboardCard icon={Bell} label="Notifications Sent" value="38" />
        <DashboardCard icon={FileQuestion} label="Pending Doubts" value={pendingDoubtCount} />
        <DashboardCard icon={CheckCircle} label="Resolved Doubts" value={resolvedDoubtCount} />
      </div>

      <div style={styles.sections}>
        {/* 📩 Doubt Management */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📩 Doubt Management</h2>
          <ul style={styles.sectionList}>
            <li>Receive and review submitted doubts</li>
            <li>Filter doubts by user or course</li>
            <li>Send answers directly via email</li>
            <li>Mark doubts as resolved</li>
            <li>Track average response time</li>
          </ul>
        </div>

        {/* 👥 User Management */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👥 User Management</h2>
          <ul style={styles.sectionList}>
            <li>View all registered users</li>
            <li>Block or unblock suspicious users</li>
            <li>Edit user roles (Student, Mentor, Admin)</li>
            <li>Delete inactive accounts</li>
          </ul>
        </div>

        {/* 📚 Course Management */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Course Management</h2>
          <ul style={styles.sectionList}>
            <li>Add new courses with details</li>
            <li>Edit or delete existing courses</li>
            <li>Assign mentors to courses</li>
            <li>Track student enrollments</li>
          </ul>
        </div>

        {/* 👨‍🏫 Mentor Avatars */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>👨‍🏫 Mentor Avatars</h2>
          <ul style={styles.sectionList}>
            <li>Upload or update mentor avatars</li>
            <li>Assign avatars to mentor profiles</li>
            <li>Moderate inappropriate content</li>
          </ul>
        </div>

        {/* 🧪 Quiz & Certification */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>🧪 Quiz & Certification</h2>
          <ul style={styles.sectionList}>
            <li>Create and assign quizzes to courses</li>
            <li>Auto-grade quiz submissions</li>
            <li>Generate and email certificates</li>
          </ul>
        </div>

        {/* 📢 Notifications */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📢 Notifications & Email</h2>
          <ul style={styles.sectionList}>
            <li>Send announcements to users</li>
            <li>Use EmailJS or Nodemailer integration</li>
            <li>Track delivery status and response</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
