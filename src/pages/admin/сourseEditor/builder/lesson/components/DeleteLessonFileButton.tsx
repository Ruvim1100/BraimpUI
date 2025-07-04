import {
  IconButton,
  Tooltip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../api/react-query";
import { deleteLessonFile } from "../../../../../../api/lessonFilesApi";
import type { DeleteLessonFileParams } from "../../../../../../models/lessonFiles/deleteLessonFile";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { useState } from "react";

interface Props {
  id: string;
  courseId: string;
  moduleId: string;
  lessonId: string;
}

export const DeleteLessonFileButton = ({
  id,
  courseId,
  moduleId,
  lessonId,
}: Props) => {
  const axios = useAxiosPrivate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: (params: DeleteLessonFileParams) =>
      deleteLessonFile(axios, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonDetails", courseId, moduleId, lessonId],
      });
      setDialogOpen(false);
    },

    onError: (error) => {
      console.error("Error deleting file:", error);
      setDialogOpen(false);
    },
  });

  const handleDelete = () => {
    mutate({ id, courseId, moduleId, lessonId });
  };

  return (
    <>
      <Tooltip title="Удалить файл">
        <span>
          <IconButton
            size="small"
            onClick={() => setDialogOpen(true)}
            disabled={isPending}
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 1,
            }}
          >
            {isPending ? (
              <CircularProgress size={16} />
            ) : (
              <DeleteIcon fontSize="small" />
            )}
          </IconButton>
        </span>
      </Tooltip>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Удалить файл?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить этот файл?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={isPending}>
            Отмена
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            disabled={isPending}
            variant="contained"
          >
            {isPending ? "Удаление..." : "Удалить"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
