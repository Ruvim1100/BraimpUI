import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useState, type ChangeEvent } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File, fileName: string) => void;
}

const validationSchema = Yup.object({
  fileName: Yup.string()
    .required("File name is required")
    .max(50, "File name must be at most 50 characters"),
});
export const FileUploadDialog = ({
  open,
  onClose,
  onUpload,
}: FileUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);

  const formik = useFormik({
    initialValues: {
      fileName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (file) {
        onUpload(file, values.fileName);
        handleClose();
      }
    },
    enableReinitialize: true,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);

    if (selectedFile) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      formik.setFieldValue("fileName", nameWithoutExt);
      formik.setFieldTouched("fileName", true);
    }
  };

  const handleClose = () => {
    setFile(null);
    formik.resetForm();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Upload File</DialogTitle>  
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <Button sx={{maxWidth: 200}} variant="outlined" component="label">
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <TextField
              label="File Name"
              name="fileName"
              value={formik.values.fileName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.fileName && Boolean(formik.errors.fileName)}
              helperText={formik.touched.fileName && formik.errors.fileName}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={!file || !formik.isValid || !formik.dirty}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
