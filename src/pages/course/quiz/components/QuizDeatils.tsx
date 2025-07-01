import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import type { QuizDetailsResponse } from "../../../../models/quizzes/getQuizDetails";
import { getQuizDetails } from "../../../../api/quizApi";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { paths } from "../../../../routes/paths";

export const QuizDetails = () => {
  const { courseId, quizId } = useParams();
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const path = (courseId : string, quizId: string) => paths.course.quizSession
  .replace(":courseId", courseId)
  .replace(":quizId", quizId);

  if (!courseId || !quizId) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.invalidParameters")}
      </Typography>
    );
  }

  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery<QuizDetailsResponse>({
    queryKey: ["quiz", courseId, quizId],
    queryFn: () => getQuizDetails(axios, courseId, quizId),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !quiz) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.quizDetailsLoadError")}
      </Typography>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
    <Card sx={{ width: "100%", boxShadow: 0, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
          {quiz.title}
        </Typography>

        <Typography
          variant="body1"
          align="center"
          color="text.secondary"
          mb={3}
        >
          {quiz.description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Grid container columns={12} columnSpacing={4} rowSpacing={2} mb={3}>
          <Grid sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("course.testParameters")}
              </Typography>
              <Typography variant="body2">
                {t("course.duration")}: {quiz.timeLimitMinutes}{" "}
                {t("course.minutes")}
              </Typography>
              <Typography variant="body2">
                {t("course.questions")}: {""}
              </Typography>
              <Typography variant="body2">
                {t("course.passingScore")}: {""}
              </Typography>
            </Stack>
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("course.attempts")}
              </Typography>
              <Typography variant="body2">
                {t("course.total")}: {quiz.maxAttempts}
              </Typography>
              <Typography variant="body2">
                {t("course.remaining")}: {""}
              </Typography>
            </Stack>
          </Grid>

          <Grid sx={{ gridColumn: { xs: "span 12", md: "span 4" } }}>
            <Stack spacing={1}>
              <Typography variant="subtitle2" color="text.secondary">
                {t("course.availability")}
              </Typography>
              <Typography variant="body2">
                {t("course.availableUntil")}:{" "}
                {format(new Date(quiz.availableUntil), "dd.MM.yyyy")}
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end">
          <Button onClick={() => navigate(path(courseId, quizId))} variant="contained" color="primary" sx={{ minWidth: 180 }}>
            {t("course.startQuiz")}
          </Button>
        </Box>
      </CardContent>
    </Card>
  </Box>
  );
};
