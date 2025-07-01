import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getPublishedLessons } from "../../../../api/lessonApi";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../routes/paths";

type LessonListProps = {
  courseId: string;
  moduleId: string;
};

function LessonList({ courseId, moduleId }: LessonListProps) {
  const axios = useAxiosPrivate();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getLessonPath = (
    courseId: string,
    moduleId: string,
    lessonId: string
  ) =>
    paths.course.lesson
      .replace(":courseId", courseId)
      .replace(":moduleId", moduleId)
      .replace(":lessonId", lessonId);

  const { data, isLoading, isError } = useQuery({
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

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.assignmentLoadError")}
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
    <List disablePadding sx={{ p: 0, m: 0 }}>
      {lessons.map((lesson) => (
        <ListItem key={lesson.id} disableGutters sx={{ p: 0, m: 0 }}>
          <Box sx={{ mx: "auto", width: "90%" }}>
            <ListItemButton
              onClick={() =>
                navigate(getLessonPath(courseId, moduleId, lesson.id))
              }
              disableGutters
              sx={{ p: 1, m: 0.5, borderRadius: 2, backgroundColor: "secondary.main"}}
            >
              <Box display={"flex"} gap={2} alignItems={"center"} >
                <SchoolOutlinedIcon sx={{ fontSize: 32 }}color="primary" />
                <Box>
                  <Typography fontWeight={500} fontSize={15}>
                    {lesson.sortIndex} {lesson.title}
                  </Typography>
                  <Typography color="primary" fontSize={14}>Пройдено</Typography>
                </Box>
              </Box>
            </ListItemButton>
          </Box>
        </ListItem>
      ))}
    </List>
  );
}

export default LessonList;
