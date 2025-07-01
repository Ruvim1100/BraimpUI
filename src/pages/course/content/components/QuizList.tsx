import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getPublishedQuizzes } from "../../../../api/quizApi";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import LockIcon from "@mui/icons-material/Lock";
import QuizIcon from "@mui/icons-material/Quiz";
import type { PublishedQuizLookupModel } from "../../../../models/quizzes/getQuizList";
import { paths } from "../../../../routes/paths";

export const QuizList = () => {
  const { courseId } = useParams();
  const axios = useAxiosPrivate();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const getQuizPath = (courseId: string, quizId: string) =>
    paths.course.quiz.replace(":courseId", courseId).replace(":quizId", quizId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizzes", courseId],
    queryFn: () => getPublishedQuizzes(axios, courseId!),
  });

  if (isLoading) {
    return (
      <>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} animation={i % 2 ? "wave" : false} />
        ))}
      </>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.assignmentLoadError")}
      </Typography>
    );
  }

  const quizzes = data ?? [];

  const now = new Date();

  const isQuizAvailable = (quiz: PublishedQuizLookupModel) => {
    const fromOk = !quiz.availableFrom || now >= new Date(quiz.availableFrom);
    const untilOk =
      !quiz.availableUntil || now <= new Date(quiz.availableUntil);
    return fromOk && untilOk;
  };

  return (
    <Box>
      <Typography variant="h6" color="text.secondary" mb={1}>
        {t("course.testing")}
      </Typography>

      <List disablePadding>
        {quizzes.map((quiz) => {
          const available = isQuizAvailable(quiz);

          return (
            <Box
              key={quiz.id}
              mb={1}
              borderRadius={2}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              {available ? (
                <ListItemButton
                  onClick={() => navigate(getQuizPath(courseId!, quiz.id))}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ListItemIcon>
                    <QuizIcon fontSize="large" color="primary" />
                  </ListItemIcon>

                  <ListItemText
                    primary={quiz.title}
                    secondary={`${t("course.attempts")}: ${quiz.maxAttempts}`}
                  />
                </ListItemButton>
              ) : (
                <ListItem sx={{ display: "flex", alignItems: "center" }}>
                  <ListItemIcon>
                    <LockIcon fontSize="large" color="disabled" />
                  </ListItemIcon>

                  <ListItemText
                    primary={quiz.title}
                    secondary={`${t("course.attempts")}: ${quiz.maxAttempts}`}
                  />
                </ListItem>
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
