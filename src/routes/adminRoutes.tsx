import type { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import AdminLayout from "../layouts/adminLayout";
import { DashboardPage } from "../pages/admin/dashboard";
import { CourseEditor } from "../pages/admin/сourseEditor";
import { BuilderLayout } from "../pages/admin/сourseEditor/builder";
import { BuilderEmpty } from "../pages/admin/сourseEditor/builder/Empty";
import { LessonEditor } from "../pages/admin/сourseEditor/builder/lesson/LessonEditor";

const adminRoutes: RouteObject = {
  path: paths.admin.base,
  element: <AdminLayout />,
  children: [
    { index: true, element: <DashboardPage /> },
    {
      path: ":courseId",
      element: <CourseEditor />,
      children: [
        {
          path: "builder",
          element: <BuilderLayout />,
          children: [
            { index: true, element: <BuilderEmpty /> },
             { path: ":moduleId/:lessonId", element: <LessonEditor /> },
            // { path: "quiz/:quizId", element: <QuizEditor /> },
            // { path: "assignment/:assignmentId", element: <AssignmentEditor /> },
          ],
        },
      ],
    },
  ],
};

export default adminRoutes;
