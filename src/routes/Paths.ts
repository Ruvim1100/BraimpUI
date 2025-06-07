export const paths = {
  // Public
  landing: '/',
  about: '/about',
  features: '/features',
  login: '/login',

  // Private
  dashboard: '/dashboard',
  myCourses: 'my-courses',
  myStudio: 'my-studio',
  profile: 'profile',

  // Course
  courseBase: 'course',
  courseDetails: (id: string) => `course/${id}`,
  courseOverview: (id: string) => `course/${id}/overview`,
  courseAssignments: (id: string) => `course/${id}/assignments`,
} as const;
