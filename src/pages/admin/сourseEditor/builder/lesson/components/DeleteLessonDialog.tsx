import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../../../api/react-query";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import type { DeleteLessonParams } from "../../../../../../models/lessons/deleteLesson";
import { deleteLesson } from "../../../../../../api/lessonApi";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../../../routes/paths";

interface Props {
  open: boolean;
  onClose: () => void;
  id: string;
  courseId: string;
  moduleId: string;
}

export const DeleteLessonDialog = ({ open, onClose, id, courseId, moduleId }: Props) => {
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: (params: DeleteLessonParams) =>
      deleteLesson(axios, params),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
      navigate(paths.admin.courseEditor.builder.base.replace(":courseId", courseId));
      onClose();
    },

    onError: (error) => {
      console.error("Error deleting lesson:", error);
      onClose();
    },
  });

  const handleDelete = () => {
    mutate({ id, courseId, moduleId });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Удалить Урок?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы уверены, что хотите удалить этот Урок?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isPending}>Отмена</Button>
        <Button onClick={handleDelete} color="error" variant="contained" disabled={isPending}>
          {isPending ? "Удаление..." : "Удалить"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
