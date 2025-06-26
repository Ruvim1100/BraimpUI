import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getPublishedLessons } from "../../../../api/lessonApi";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

type LessonListProps = {
  courseId: string;
  moduleId: string;
};

function LessonList({ courseId, moduleId }: LessonListProps) {
  const axios = useAxiosPrivate();
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lessons", courseId, moduleId],
    queryFn: () => getPublishedLessons(axios, courseId, moduleId),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.lessonLoadError")}
      </Typography>
    );
  }

  const lessons = data ?? [];

  if (lessons.length === 0) {
  return (
    <Typography align="center" color="text.secondary">
      {t("course.noLessons")}
    </Typography>
  );
}

  return (
    <List>
      {lessons.map((lesson) => (
        <ListItem key={lesson.id}>
          <Typography>{lesson.title}</Typography>
        </ListItem>
      ))}
    </List>
  );
}

export default LessonList;
