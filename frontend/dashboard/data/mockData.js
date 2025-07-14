import { Course, Quiz, CalendarEvent, UpcomingCourse, Activity, User, NavItem } from '../types';
import { format } from 'date-fns';

export const currentUser = {
  id: '1',
  name: 'Student',
};

export const navItems[] = [
  { title: 'Dashboard', icon: 'layout-dashboard', path: '/' },
  { title: 'My Courses', icon: 'book-open', path: '/courses' },
  { title: 'Discussion', icon: 'message-circle', path: '/discussion' },
  { title: 'Analytics', icon: 'bar-chart', path: '/analytics' },
  { title: 'Settings', icon: 'settings', path: '/settings' },
];

export const courses[] = [
  {
    id: '1',
    title: 'Introduction to React',
    lessonsCompleted,
    totalLessons,
    progress,
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    lessonsCompleted,
    totalLessons,
    progress,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    lessonsCompleted,
    totalLessons,
    progress.5,
  },
];

export const quizzes[] = [
  {
    id: '1',
    title: 'JavaScript Basics Quiz',
    date: 'Today',
    time: '9 AM',
    score,
  },
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    date: 'Yesterday',
    time: '4 PM',
    score,
  },
  {
    id: '3',
    title: 'CSS Grid & Flexbox Quiz',
    date: 'Mar 15',
    time: '11 AM',
    score,
  },
  {
    id: '4',
    title: 'TypeScript Basics Quiz',
    date: 'Mar 10',
    time: '2 PM',
    score,
  },
];

export const currentDate = new Date();
export const calendarEvents[] = [
  {
    id: '1',
    title: 'React Hooks Workshop',
    date Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    type: 'class',
  },
  {
    id: '2',
    title: 'JavaScript Quiz',
    date Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
    type: 'quiz',
  },
  {
    id: '3',
    title: 'UI/UX Project Due',
    date Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
    type: 'assignment',
  },
];

export const upcomingCourses[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    date: 'Tomorrow',
    time: '10 AM',
    duration: '1h 30m',
  },
  {
    id: '2',
    title: 'Web Security Fundamentals',
    date: 'Mar 20',
    time: '2 PM',
    duration: '1h',
  },
  {
    id: '3',
    title: 'Advanced React Hooks',
    date: 'Mar 22',
    time: '11 AM',
    duration: '2h',
  },
];

export const recentActivities[] = [
  {
    id: '1',
    title: 'JavaScript Basics Quiz',
    type: 'quiz',
    date: 'Today',
    time: '9 AM',
    score,
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    type: 'lesson',
    date: 'Yesterday',
    time: '4 PM',
    status: 'completed',
  },
  {
    id: '3',
    title: 'CSS Animation Project',
    type: 'assignment',
    date: 'Mar 15',
    time: '6 PM',
    status: 'completed',
  },
];

export const availableSubjects = [
  'Computer Science',
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'English',
  'History',
  'Geography',
];