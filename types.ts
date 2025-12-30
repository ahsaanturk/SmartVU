
export type Program = 'BSCS' | 'IT' | 'SE';

export interface UserProfile {
  name: string;
  email: string;
  whatsapp: string;
  program: Program;
  semester: number;
  enrolledCourses: string[];
  streak: number;
  lastLoginDate: string;
  completedTaskIds: string[];
}

export interface Task {
  id: string;
  courseCode: string;
  title: string;
  type: 'quiz' | 'assignment' | 'lecture';
  deadline: string;
  contentUrl?: string;
  description?: string;
}

export interface Course {
  code: string;
  name: string;
  semester: number;
  program: Program[];
  handouts: Handout[];
  videos: Video[];
}

export interface Handout {
  id: string;
  title: string;
  url: string;
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

export enum AppRoute {
  DASHBOARD = 'dashboard',
  LECTURES = 'lectures',
  QUIZZES = 'quizzes',
  HANDOUTS = 'handouts',
  PROFILE = 'profile',
  ADMIN = 'admin',
  ONBOARDING = 'onboarding'
}
