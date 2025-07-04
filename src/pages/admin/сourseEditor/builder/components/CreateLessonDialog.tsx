import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    isPublished: boolean;
  }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").max(100),
  description: Yup.string().max(1000),
});

export const CreateLessonDialog = ({ open, onClose, onSubmit }: Props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      isPublished: false,
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      formik.resetForm();
      onClose();
    },
  });

  useEffect(() => {
    if (!open) {
      formik.resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Создать лекцию</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              name="title"
              label="Название"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
              fullWidth
            />
            <TextField
              name="description"
              label="Описание"
              multiline
              minRows={3}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.isPublished}
                  onChange={formik.handleChange}
                  name="isPublished"
                />
              }
              label="Опубликовать сразу"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit" variant="contained">
            Создать
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
