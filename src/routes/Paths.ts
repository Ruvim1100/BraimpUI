export const paths = {
  public: {
    landing: "/",
    callback: "/auth-callback",
  },

  learning: {
    base: "/learning",
  },

  course: {
    base: "/courses/:courseId",
    news: "/courses/:courseId/news",
    content: "/courses/:courseId/content",
    grades: "/courses/:courseId/grades",
    participants: "/courses/:courseId/participants",
    settings: "/courses/:courseId/settings",
    lesson: "/courses/:courseId/modules/:moduleId/lesson/:lessonId",
    quiz: "/courses/:courseId/quizzes/:quizId",
    assignment: "/courses/:courseId/assignments/:assignmentId",
    quizSession: "/courses/:courseId/quizzes/:quizId/quizSession"
  },

  admin: {
    base: "/admin",
  },

  notFound: "*"
} as const;
