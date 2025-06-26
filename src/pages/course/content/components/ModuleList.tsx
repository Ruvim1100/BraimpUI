import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { getPublishedModules } from "../../../../api/moduleApi";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import LessonList from "./LessonList";

function ModuleList() {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { courseId } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getPublishedModules(axios, courseId!),
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
        {t("learning.courseLoadError")}
      </Typography>
    );
  }

  const modules = data ?? [];

  return (
    <Box>
      <Box>
        <Typography
          component="h2"
          variant="h6"
          color="text.secondary"
          gutterBottom
        >
          Модули курса
        </Typography>
      </Box>
      {modules.map((module) => (
        <Accordion
          key={module.id}
          sx={{
            mb: 1,
            borderRadius: 2,
            border: "none",
            "&::before": {
              display: "none",
            },
          }}
          elevation={0}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar>{module.sortIndex}</Avatar>
                <Typography>{module.title}</Typography>
              </Box>

              <Typography color="text.secondary">{module.lessonCount} Лекции</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <LessonList moduleId={module.id} courseId={courseId!} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default ModuleList;
