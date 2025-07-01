export const apiRoutes = {
    categories: {

    },
    courses: {
        getEnrolled: "/courses/enrolled",
        getOwned: "/courses/owned",
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
        getPublishedQuizzes: (courseId: string) => `/courses/${courseId}/quizzes/published`,
        getQuizDetails: (courseId: string, quizId: string) => `/courses/${courseId}/quizzes/${quizId}`
    },

    assignments: {
        getAssignments: (courseId: string) => `/courses/${courseId}/assignments`,
        getAssignmentDetails: (courseId: string, assignmentId: string) => `/courses/${courseId}/assignments/${assignmentId}`
    },

    questions: {
        getQuestions: (courseId : string, quizId: string) => `/courses/${courseId}/quizzes${quizId}/quizQuestions`
    }
}