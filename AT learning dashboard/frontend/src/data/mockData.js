import pythonImg from "../assets/python_for_ai_logo.png";
import dataImg from "../assets/data_analytics.png";
import reactImg from "../assets/react_fundamentals_logo.png";
//-----------Sidebar Courses -----------
const courses = [
  {
    title: "React Fundamentals",
    lesson: "Lesson 18: State Management",
    progress: 75,
    image: reactImg,
  },
  {
    title: "Python for AI",
    lesson: "Lesson 9: Neural Networks",
    progress: 45,
    image: pythonImg,
  },
  {
    title: "Digital Marketing",
    lesson: "Lesson 27: SEO Optimization",
    progress: 90,
    image: dataImg,
  },
];
export default courses;
// ---------- User ----------
export const currentUser = {
  id: '1',
  name: 'Student',
  email: 'student@example.com',
  role: 'Learner',
  avatarUrl: '', // Add a URL if available
};

// ---------- Sidebar Nav ----------
export const navItems = [
  { title: 'Dashboard', icon: 'LayoutDashboard', path: '/app' },
  { title: 'My Courses', icon: 'BookOpen', path: '/app/courses' },
  { title: 'Discussion', icon: 'MessageCircle', path: '/app/discussion' },
  { title: 'Doubt Room', icon: 'HelpCircle', path: '/app/doubts' },
  { title: 'Analytics', icon: 'BarChart', path: '/app/analytics' },
  { title: 'Settings', icon: 'Settings', path: '/app/settings' },
  { title: 'Watched Videos', icon: 'Video', path: '/app/videos' }, // ✅ Added
];

// ---------- Courses / Progress ----------
export const mycourses = [
  {
    id: '1',
    title: 'Data Structures & Algorithms',
    lessonsCompleted: 9,
    totalLessons: 12,
    progress: 75,
  },
  {
    id: '2',
    title: 'Machine Learning Basics',
    lessonsCompleted: 4,
    totalLessons: 10,
    progress: 40,
  },
  {
    id: '3',
    title: 'React 101',
    lessonsCompleted: 1,
    totalLessons: 8,
    progress: 12.5,
  },
];

// ---------- Quizzes ----------
export const quizzes = [
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

// ---------- Calendar ----------
const currentDate = new Date();
export const calendarEvents = [
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

// ---------- Upcoming Courses ----------
export const upcomingCourses = [
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
    date: 'July 20',
    time: '2:00 PM',
    duration: '1h',
  },
  {
    id: '3',
    title: 'Advanced React Hooks',
    date: 'August 22',
    time: '11:00 AM',
    duration: '2h',
  },
];

// ---------- Recent Activities ----------
export const recentActivities = [
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

// ---------- Subjects ----------
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

// ---------- Watched Videos ----------
export const watchedVideos = [
  {
    id: 'v1',
    title: 'Introduction to Data Structures',
    topic: 'DSA',
    level: 'Beginner',
    watchedAt: '2025-07-30',
    videoUrl: 'https://youtube.com/watch?v=example1',
  },
  {
    id: 'v2',
    title: 'React useEffect Explained',
    topic: 'React',
    level: 'Intermediate',
    watchedAt: '2025-07-28',
    videoUrl: 'https://youtube.com/watch?v=example2',
  },
  {
    id: 'v3',
    title: 'Machine Learning Introduction',
    topic: 'ML',
    level: 'Beginner',
    watchedAt: '2025-07-25',
    videoUrl: 'https://youtube.com/watch?v=example3',
  },
];

// ---------- Settings Tabs ----------
export const settingsTabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'language', label: 'Language' },
];
