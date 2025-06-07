export const paths = {
  landing: '/',
  about: '/about',
  features: '/features',
  login: '/login',

  dashboard: '/dashboard',
  myCourses: '/dashboard/my-courses',
  myStudio: '/dashboard/my-studio',
  profile: '/dashboard/profile',

  courseBase: '/dashboard/course',
  courseDetails: (id: string) => `/dashboard/course/${id}`,
  courseOverview: (id: string) => `/dashboard/course/${id}/overview`,
  courseAssignments: (id: string) => `/dashboard/course/${id}/assignments`,
};