import {
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getQuizQuestions } from "../../../api/questionApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { QuizForm } from "./components/QuizForm";


export const QuizSessionPage = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { courseId, quizId } = useParams();

  if (!courseId || !quizId) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.quizQuestionsError")}
      </Typography>
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["quizSession", courseId, quizId],
    queryFn: () => getQuizQuestions(axios, courseId, quizId),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }
  const questions = data ?? [];
  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.")}
      </Typography>
    );
  }
  console.log(data);
  return (
    <Box>
      <QuizForm questions={questions} quizAttemptId={"1"}/>
    </Box>
  );
};
