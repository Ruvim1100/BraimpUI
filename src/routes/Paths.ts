export const paths = {
  public: {
    landing: "/",
    callback: "/auth-callback",
  },

  learning: {
    base: "/learning",
  },

  course: {
    base: "/courses/:id",
    news: "/courses/:id/news",
    content: "/courses/:id/content",
    grades: "/courses/:id/grades",
    participants: "/courses/:id/participants",
    settings: "/courses/:id/settings",
  },

  admin: {
    base: "/admin",
  },

  notFound: "*"
} as const;
