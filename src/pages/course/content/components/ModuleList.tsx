import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Skeleton,
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getPublishedModules(axios, courseId!),
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


  const modules = data ?? [];

  return (
    <Box>
      <Box>
        <Typography
          component="h6"
          variant="h6"
          color="text.secondary"
          mb={1}
        >
          {t("course.courseModules")}
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
                <Typography fontWeight={"500"} color="text.primary">{module.title}</Typography>
              </Box>

              <Typography color="text.secondary">{module.lessonCount} Лекции</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{p: 0}}>
            <LessonList moduleId={module.id} courseId={courseId!} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

export default ModuleList;
