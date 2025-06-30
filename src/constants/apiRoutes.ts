export const apiRoutes = {
    categories: {

    },
    courses: {
        getEnrolled: "/courses/enrolled",
        getAllCourses: "/courses"
    },

    modules: {
        getModules: (courseId: string) => `/courses/${courseId}/modules`,
        getPublishedModules: (courseId: string) => `/courses/${courseId}/modules/published`,
    },

    lessons: {
        getPublishedLessons: (courseId: string, moduleId:string) => `/courses/${courseId}/modules/${moduleId}/lessons/published`
    },

    quizzes: {
        getPublishedQuizzes: (courseId: string) => `/courses/${courseId}/quizzes/published`
    },

    assignments: {
        getAssignments: (courseId: string) => `/courses/${courseId}/assignments`
    }
}