import type { RouteObject } from "react-router-dom";
import { paths } from "./paths";
import DashboardPage from "../pages/course/dashboard";
import CourseLayout from "../layouts/courseLayout";
import NewsPage from "../pages/course/news";
import ContentPage from "../pages/course/content";
import GradesPage from "../pages/course/grades";
import ParticipantsPage from "../pages/course/participants";
import SettingPage from "../pages/course/settnigs";

const courseRoutes: RouteObject= {
        path: paths.course.base,
        element: <CourseLayout/>,
        children: [
            {index: true, element: <DashboardPage/>},
            {path: paths.course.news, element: <NewsPage/>},
            {path: paths.course.content, element: <ContentPage/>},
            {path: paths.course.grades, element: <GradesPage/>},
            {path: paths.course.participants, element: <ParticipantsPage/>},
            {path: paths.course.settings, element: <SettingPage/>},
        ]
}

export default courseRoutes;