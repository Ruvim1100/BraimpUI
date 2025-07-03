import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router-dom";
import { getCourseById } from "../../../api/courseApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { CourseBanner } from "./components/CourseBanner";
import { TabsNavigation } from "./components/TabsNavigation";

export const CourseEditor = () => {
  const axios = useAxiosPrivate();
  const { courseId } = useParams();
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["courseDetails", courseId],
    queryFn: () => getCourseById(axios, courseId!),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("learning.courseLoadError")}
      </Typography>
    );
  }

  const course = data!;

  return (
    <>
      <CourseBanner
        title={course.title}
        category={course.courseCategory}
        imageUrl={course.bannerImageUrl}
      />
      <TabsNavigation/>
      <Outlet />
    </>
  );
};
