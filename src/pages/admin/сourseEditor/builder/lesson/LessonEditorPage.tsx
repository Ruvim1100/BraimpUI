import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLessonDetails } from "../../../../../api/lessonApi";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { LessonFileList } from "./components/LessonFileList";
import { LessonContent } from "./components/LessonContent";
import { AddNewBlock } from "./components/AddNewBlock";
import { LessonSettingsMenu } from "./components/LessonSettingsMenu";
import { useState } from "react";
import { DeleteLessonDialog } from "./components/DeleteLessonDialog";

export const LessonEditorPage = () => {
  const axios = useAxiosPrivate();
  const { courseId, moduleId, lessonId } = useParams();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    data: lesson,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["lessonDetails", courseId, moduleId, lessonId],
    queryFn: () => getLessonDetails(axios, courseId!, moduleId!, lessonId!),
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        Ошибка загрузки Урока
      </Typography>
    );
  }

  return (
    <Box display={"flex"} flexDirection={"column"} p={1}>
      <Box
        display="flex"
        alignItems={"flex-start"}
        justifyContent="space-between"
      >
        <Box flex={1} display="flex" justifyContent="center">
          <Typography mb={2} variant="h5" color="primary" fontWeight={600}>
            {lesson?.title}
          </Typography>
        </Box>

        <LessonSettingsMenu
          isPublished={lesson!.isPublished}
          onEdit={() => console.log("Редактировать")}
          onTogglePublish={() => console.log("Публикация")}
          onDelete={() => setDeleteDialogOpen(true)}
        />
      </Box>
      <DeleteLessonDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        id={lessonId!}
        courseId={courseId!}
        moduleId={moduleId!}
      />
      <Typography>{lesson?.description}</Typography>
      <Divider sx={{ my: 2, width: "90%" }} />
      <Box>
        <LessonContent />
        <AddNewBlock onBlockCreated={refetch} />
      </Box>
      <Box my={2}>
        <LessonFileList files={lesson?.files ?? []} />
      </Box>
    </Box>
  );
};
