import {
  Box,
  Button,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { LessonItem } from "./LessonItem";
import { useTranslation } from "react-i18next";
import type { LessonLookupModel } from "../../../../../models/modules/getModules";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { createLesson } from "../../../../../api/lessonApi";
import { queryClient } from "../../../../../api/react-query";
import { useParams } from "react-router-dom";
import { CreateLessonDialog } from "./CreateLessonDialog";

interface Props {
  id: string;
  title: string;
  isPublished: boolean;
  sortIndex: number;
  lessons: LessonLookupModel[];
  onLessonSelect: (lesson: { id: string; moduleId: string }) => void;
}

export const ModuleItem = ({
  id: moduleId,
  title,
  isPublished,
  sortIndex,
  lessons,
  onLessonSelect,
}: Props) => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const {courseId} = useParams();

const createLessonMutation = useMutation({
  mutationFn: (data: {
    courseId: string;
    moduleId: string;
    title: string;
    description: string;
    isPublished: boolean;
  }) => {
    const { courseId, moduleId, ...params } = data;
    return createLesson(axios, courseId, moduleId, params);
  },
  onSuccess: (_, variables) => {
    queryClient.invalidateQueries({
      queryKey: ["modules", variables.courseId],
    });
    setDialogOpen(false);
  },
});

  const handleCreateLesson = (values: {
    title: string;
    description: string;
    isPublished: boolean;
  }) => {
    createLessonMutation.mutate({
      courseId: courseId!,
      moduleId,
      ...values,
    });
  };


  return (
    <Box mb={1} borderRadius={1}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            {open ? (
              <ExpandLessIcon fontSize="small" />
            ) : (
              <ExpandMoreIcon fontSize="small" />
            )}
          </IconButton>
          <Typography variant="body1" fontWeight={450}>
            {sortIndex}. {title}
          </Typography>
        </Box>

        <Tooltip title={isPublished ? t("admin.published") : t("admin.hidden")}>
          <Box component="span">
            {isPublished ? (
              <VisibilityIcon color="primary" fontSize="small" />
            ) : (
              <VisibilityOffIcon fontSize="small" />
            )}
          </Box>
        </Tooltip>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box mt={1} ml={4}>
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              onClick={() =>
                onLessonSelect({
                  id: lesson.id,
                  moduleId: moduleId,
                })
              }
            />
          ))}
          <Box display="flex" justifyContent="center" mt={1}>
            <Button onClick={() => setDialogOpen(true)} variant="outlined" size="small" sx={{ width: "80%" }}>
              + {t("admin.addLesson")}
            </Button>
          </Box>
        </Box>
      </Collapse>

      <CreateLessonDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleCreateLesson}
      />

    </Box>
  );
};
