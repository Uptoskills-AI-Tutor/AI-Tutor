export interface Course {
  id: string;
  title: string;
  lessonsCompleted: number;
  totalLessons: number;
  progress: number;
}

export interface Quiz {
  id: string;
  title: string;
  date: string;
  time: string;
  score: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'class' | 'quiz' | 'assignment';
}

export interface UpcomingCourse {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
}

export interface Activity {
  id: string;
  title: string;
  type: 'quiz' | 'lesson' | 'assignment';
  date: string;
  time: string;
  status?: 'completed' | 'in-progress';
  score?: number;
}

export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface NavItem {
  title: string;
  icon: string;
  path: string;
}