import { Course, Quiz, CalendarEvent, UpcomingCourse, Activity, User, NavItem } from '../types';
import { format } from 'date-fns';

export const currentUser: User = {
  id: '1',
  name: 'Student',
};

export const navItems: NavItem[] = [
  { title: 'Dashboard', icon: 'layout-dashboard', path: '/' },
  { title: 'My Courses', icon: 'book-open', path: '/courses' },
  { title: 'Discussion', icon: 'message-circle', path: '/discussion' },
  { title: 'Analytics', icon: 'bar-chart', path: '/analytics' },
  { title: 'Settings', icon: 'settings', path: '/settings' },
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Introduction to React',
    lessonsCompleted: 9,
    totalLessons: 12,
    progress: 75,
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    lessonsCompleted: 4,
    totalLessons: 10,
    progress: 40,
  },
  {
    id: '3',
    title: 'UI/UX Design Principles',
    lessonsCompleted: 1,
    totalLessons: 8,
    progress: 12.5,
  },
];

export const quizzes: Quiz[] = [
  {
    id: '1',
    title: 'JavaScript Basics Quiz',
    date: 'Today',
    time: '9:30 AM',
    score: 85,
  },
  {
    id: '2',
    title: 'React Fundamentals Quiz',
    date: 'Yesterday',
    time: '4:15 PM',
    score: 92,
  },
  {
    id: '3',
    title: 'CSS Grid & Flexbox Quiz',
    date: 'Mar 15',
    time: '11:20 AM',
    score: 78,
  },
  {
    id: '4',
    title: 'TypeScript Basics Quiz',
    date: 'Mar 10',
    time: '2:45 PM',
    score: 88,
  },
];

export const currentDate = new Date();
export const calendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'React Hooks Workshop',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    type: 'class',
  },
  {
    id: '2',
    title: 'JavaScript Quiz',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
    type: 'quiz',
  },
  {
    id: '3',
    title: 'UI/UX Project Due',
    date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
    type: 'assignment',
  },
];

export const upcomingCourses: UpcomingCourse[] = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    date: 'Tomorrow',
    time: '10:00 AM',
    duration: '1h 30m',
  },
  {
    id: '2',
    title: 'Web Security Fundamentals',
    date: 'Mar 20',
    time: '2:00 PM',
    duration: '1h',
  },
  {
    id: '3',
    title: 'Advanced React Hooks',
    date: 'Mar 22',
    time: '11:00 AM',
    duration: '2h',
  },
];

export const recentActivities: Activity[] = [
  {
    id: '1',
    title: 'JavaScript Basics Quiz',
    type: 'quiz',
    date: 'Today',
    time: '9:30 AM',
    score: 85,
  },
  {
    id: '2',
    title: 'React Hooks Deep Dive',
    type: 'lesson',
    date: 'Yesterday',
    time: '4:15 PM',
    status: 'completed',
  },
  {
    id: '3',
    title: 'CSS Animation Project',
    type: 'assignment',
    date: 'Mar 15',
    time: '6:20 PM',
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