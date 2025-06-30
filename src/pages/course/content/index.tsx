import { Box } from "@mui/material";
import ModuleList from "./components/ModuleList";
import { QuizList } from "./components/QuizList";
import { AssignmentList } from "./components/AssignmentList";

function ContentPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <ModuleList />
      <QuizList/>
      <AssignmentList/>
    </Box>
  );
}

export default ContentPage;
