import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCategories } from "../hooks/useCategories";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import CreateCourseImg from "../assets/createCourse.png"
import { GradingSystem } from "../models/courses/enums/gradingSystem";

export default function CreateCourseFormDialog() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { categories, loading, error } = useCategories();

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const gradingSystemOptions = [
    { label: t("learning.tenPoint"), value: GradingSystem.TenPoint },
    { label: t("learning.hundredPoint"), value: GradingSystem.HundredPoint },
    { label: t("learning.fivePoint"), value: GradingSystem.FivePoint },
    { label: t("learning.letter"), value: GradingSystem.Letter },
  ];

  const initialValues = {
    title: "",
    description: "",
    gradingSystem: GradingSystem.TenPoint,
    courseCategoryId: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .max(100, t("learning.titleMaxLength"))
      .required(t("learning.titleRequired")),

    description: Yup.string()
      .max(1000, t("learning.descriptionMaxLength"))
      .required(t("learning.descriptionRequired")),

    gradingSystem: Yup.string().required(t("learning.gradingRequired")),

    courseCategoryId: Yup.string().uuid().required(t("learning.categoryRequired")),
  });

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {t("learning.createCourse")}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t("learning.createCourse")}</DialogTitle>
        <Box component="img" src={CreateCourseImg} alt={t("learning.createCourse")} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values: any) => {
            console.log("Form Submitted:", values);
            handleClose();
          }}
        >
          {({ values, handleChange, errors, touched }) => (
            <Form>
              <DialogContent
                sx={{ display: "flex", flexDirection: "column", gap: 1 }}
              >
                <Typography>
                  {t("learning.courseApprovalNotice")}
                </Typography>
                <TextField
                  fullWidth
                  label={t("learning.courseTitle")}
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                  helperText={
                    touched.title && typeof errors.title === "string"
                      ? errors.title
                      : undefined
                  }
                  margin="dense"
                />

                <Box display={"flex"} flexDirection={"row"} gap={1}>
                  <TextField
                    sx={{ flex: 1 }}
                    select
                    label={t("learning.gradingSystem")}
                    name="learning.gradingSystem"
                    value={values.gradingSystem}
                    onChange={handleChange}
                    error={
                      touched.gradingSystem && Boolean(errors.gradingSystem)
                    }
                    helperText={
                      touched.gradingSystem &&
                      typeof errors.gradingSystem === "string"
                        ? errors.gradingSystem
                        : undefined
                    }
                    margin="dense"
                  >
                    {gradingSystemOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  {loading ? (
                    <Box mt={2} display="flex" justifyContent="center">
                      <CircularProgress size={24} />
                    </Box>
                  ) : error ? (
                    <Box mt={2} color="error.main">
                      {t("learning.failedToLoadCategories")}
                    </Box>
                  ) : (
                    <TextField
                      select
                      sx={{ flex: 1 }}
                      label={t("learning.category")}
                      name="courseCategoryId"
                      value={values.courseCategoryId}
                      onChange={handleChange}
                      error={
                        touched.courseCategoryId &&
                        Boolean(errors.courseCategoryId)
                      }
                      helperText={
                        touched.courseCategoryId &&
                        typeof errors.courseCategoryId === "string"
                          ? errors.courseCategoryId
                          : undefined
                      }
                      margin="dense"
                    >
                      {categories.map((category) => (
                        <MenuItem
                          key={category.id}
                          value={category.id}
                          sx={{ whiteSpace: "normal" }}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                </Box>

                <TextField
                  fullWidth
                  multiline
                  label={t("learning.courseDescription")}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}
                  helperText={
                    touched.description &&
                    typeof errors.description === "string"
                      ? errors.description
                      : undefined
                  }
                  margin="dense"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>{t("learning.cancel")}</Button>
                <Button type="submit">{t("learning.create")}</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  );
}
