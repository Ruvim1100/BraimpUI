import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; isPublished: boolean }) => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is Required").max(100),
});

export const CreateModuleDialog = ({ open, onClose, onSubmit }: Props) => {
  const formik = useFormik({
    initialValues: {
      title: "",
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
      <DialogTitle>Create Module</DialogTitle>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            autoFocus
            fullWidth
            name="title"
            label="Module Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="isPublished"
                checked={formik.values.isPublished}
                onChange={formik.handleChange}
              />
            }
            label="Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
