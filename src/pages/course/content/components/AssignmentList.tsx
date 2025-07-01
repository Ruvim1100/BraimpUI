import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAssignments } from "../../../../api/assignmentsApi";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { format } from "date-fns";
import { paths } from "../../../../routes/paths";

export const AssignmentList = () => {
  const axios = useAxiosPrivate();
  const { courseId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getAssignmentPath = (courseId: string, assignmentId: string) => 
    paths.course.assignment
  .replace(":courseId", courseId)
  .replace(":assignmentId", assignmentId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignments", courseId],
    queryFn: () => getAssignments(axios, courseId!),
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

  const assignments = data ?? [];

  return (
    <Box>
      <Typography variant="h6" color="text.secondary" mb={1}>
        {t("course.assignments")}
      </Typography>

      <List disablePadding>
        {assignments.map((assignment) => (
          <Box
            key={assignment.id}
            mb={1}
            borderRadius={2}
            sx={{ backgroundColor: (theme) => theme.palette.background.paper }}
          >
            <ListItemButton onClick={() => navigate(getAssignmentPath(courseId!, assignment.id))}>
              <ListItemIcon>
                <AssignmentIcon fontSize="large" color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={assignment.title}
                secondary={`${t("course.deadline")}: ${format(
                  new Date(assignment.deadline),
                  "dd.MM.yyyy"
                )}`}
              />
            </ListItemButton>
          </Box>
        ))}
      </List>
    </Box>
  );
};
