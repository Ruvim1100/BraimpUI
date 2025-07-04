export const apiRoutes = {
    categories: {

    },
    courses: {
        getEnrolled: "/courses/enrolled",
        getOwned: "/courses/owned",
        getAllCourses: "/courses",
        getCourseById: (courseId: string) => `/courses/${courseId}`
    },

    modules: {
        getModules: (courseId: string) => `/courses/${courseId}/modules`,
        getPublishedModules: (courseId: string) => `/courses/${courseId}/modules/published`,
        createModule: (courseId: string) => `/courses/${courseId}/modules`
    },

    lessons: {
        getPublishedLessons: (courseId: string, moduleId:string) => `/courses/${courseId}/modules/${moduleId}/lessons/published`,
        getLessonDetails: (courseId: string, moduleId:string, id: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${id}`,
        createLesson: (courseId: string, moduleId:string) => `/courses/${courseId}/modules/${moduleId}/lessons/`,
        deleteLesson: (courseId: string, moduleId:string, id: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${id}`,
    },

    lessonBlocks: {
        createLessonBlock: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/blocks`,
        getLessonBlocks: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/blocks`,
        updateLessonBlocks: (courseId: string, moduleId: string, lessonId: string, id: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/blocks/${id}`,
        deleteLessonBlocks: (courseId: string, moduleId: string, lessonId: string, id: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/blocks/${id}`
    },

    lessonFiles: {
        createLessonFile: (courseId: string, moduleId: string, lessonId: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/lessonFiles`,
        deleteLessonFile: (courseId: string, moduleId: string, lessonId: string, id: string) => `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}/lessonFiles/${id}`,
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