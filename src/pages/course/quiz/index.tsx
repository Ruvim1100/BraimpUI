import { Box} from "@mui/material";
import { QuizDetails } from "./components/QuizDeatils";
import { PassedQuizzes } from "./components/PassedQuizzes";

export const QuizPage = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} rowGap={5}>
      <QuizDetails />
      <PassedQuizzes/>
    </Box>
  );
};
