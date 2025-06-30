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
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useTranslation } from "react-i18next";
import LockIcon from "@mui/icons-material/Lock";
import QuizIcon from "@mui/icons-material/Quiz";
import type { PublishedQuizLookupModel } from "../../../../models/quizzes/getQuizList";

export const QuizList = () => {
  const { courseId } = useParams();
  const axios = useAxiosPrivate();
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () => getPublishedQuizzes(axios, courseId!),
  });
  if (isLoading) {
    return (
      <>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("learning.quizLoadError")}
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
      <Typography
        component="h6"
        variant="h6"
        color="text.secondary"
      >
        {t("course.testing")}
      </Typography>

      <List> 
        {quizzes.map((quiz) => {
          const available = isQuizAvailable(quiz);

          return (
            <Box
              m={1}
              borderRadius={2}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              {available ? (
                <ListItemButton
                  key={quiz.id}
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
                <ListItem
                  key={quiz.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
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
