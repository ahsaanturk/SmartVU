
import { Course, Task, Program } from './types';

export const THEME_COLOR = '#58CC02';
export const SECONDARY_COLOR = '#1CB0F6';
export const ACCENT_COLOR = '#FFC800';

export const MOCK_COURSES: Course[] = [
  {
    code: 'CS101',
    name: 'Introduction to Computing',
    semester: 1,
    program: ['BSCS', 'IT', 'SE'],
    handouts: [{ id: 'h1', title: 'Week 1: Fundamentals', url: '#' }],
    videos: [{ id: 'v1', title: 'Binary Numbers', youtubeId: 'Xpk67YzOn5w' }]
  },
  {
    code: 'CS201',
    name: 'Introduction to Programming',
    semester: 2,
    program: ['BSCS', 'SE'],
    handouts: [{ id: 'h2', title: 'Week 2: Loops', url: '#' }],
    videos: [{ id: 'v2', title: 'Nested Loops Explained', youtubeId: 'W6X_6A5X5X0' }]
  },
  {
    code: 'IT403',
    name: 'Database Management Systems',
    semester: 3,
    program: ['IT', 'BSCS'],
    handouts: [{ id: 'h3', title: 'SQL Joins', url: '#' }],
    videos: [{ id: 'v3', title: 'Database Normalization', youtubeId: 'UrYLYV7WSHM' }]
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    courseCode: 'CS101',
    title: 'Quiz #1: Computing History',
    type: 'quiz',
    deadline: '2023-12-30T23:59:59',
    description: 'Covers first 5 lectures.'
  },
  {
    id: 't2',
    courseCode: 'CS201',
    title: 'Assignment #1: Logic Building',
    type: 'assignment',
    deadline: '2023-12-28T23:59:59',
    description: 'Implement a basic calculator in C++.'
  },
  {
    id: 't3',
    courseCode: 'IT403',
    title: 'Lecture 12: Entity Relationships',
    type: 'lecture',
    deadline: '2023-12-25T10:00:00',
    contentUrl: 'UrYLYV7WSHM'
  }
];

export const PROGRAMS: Program[] = ['BSCS', 'IT', 'SE'];
