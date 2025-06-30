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
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AssignmentIcon from "@mui/icons-material/Assignment";

export const AssignmentList = () => {
  const axios = useAxiosPrivate();
  const { courseId } = useParams();
  const { t } = useTranslation();

  const { data, isLoading, error } = useQuery({
    queryKey: ["assignmnents"],
    queryFn: () => getAssignments(axios, courseId!),
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
        {t("course.assignmentLoadError")}
      </Typography>
    );
  }
  const assignments = data ?? [];
  console.log(data);
  return (
    <Box>
      <Typography component="h6" variant="h6" color="text.secondary">
        {t("course.assignments")}
      </Typography>

      <List>
        {assignments.map((assignment) => {
          return (
            <Box
              m={1}
              borderRadius={2}
              sx={{
                backgroundColor: (theme) => theme.palette.background.paper,
              }}
            >
              <ListItemButton key={assignment.id}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText
                  primary={assignment.title}
                  secondary={`Deadline: ${new Date(
                    assignment.deadLine
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`}
                />
              </ListItemButton>
            </Box>
          );
        })}
      </List>
    </Box>
  );
};
