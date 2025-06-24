export const paths = {
  public: {
    landing: "/",
    callback: "/auth-callback",
  },

  learning: {
    base: "/learning",
    Profile: "/learning/profile",
  },

  admin: {
    base: "/admin",
  },

  notFound: "*"
} as const;
