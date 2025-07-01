import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { getAssignmentDetails } from "../../../api/assignmentsApi";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { format } from "date-fns";
import { Download } from "@mui/icons-material";
import { useState } from "react";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export const AssignmentPage = () => {
  const { courseId, assignmentId } = useParams<{
    courseId: string;
    assignmentId: string;
  }>();
  const { t } = useTranslation();
  const axios = useAxiosPrivate();

  const [answerText, setAnswerText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleSubmit = async () => {
    if (!courseId || !assignmentId) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("answerText", answerText);
      files.forEach((file) => formData.append("files", file));

      await axios.post(
        `/api/courses/${courseId}/assignments/${assignmentId}/submit`,
        formData
      );

      setAnswerText("");
      setFiles([]);
      alert(t("course.submissionSuccess"));
    } catch (error) {
      console.error(error);
      alert(t("course.submissionError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!courseId || !assignmentId) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.invalidParameters")}
      </Typography>
    );
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["assignmentDetails", courseId, assignmentId],
    queryFn: () => getAssignmentDetails(axios, courseId, assignmentId),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("course.quizDetailsLoadError")}
      </Typography>
    );
  }

  const assignment = data!;
  console.log(assignment);
  return (
    <Box>
      <Card sx={{ p: 3 }}>
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant="h5" gutterBottom>
              {assignment.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Deadline: {format(new Date(assignment.deadline), "dd.MM.yyyy")}
            </Typography>
          </Box>
          <Typography variant="body1">{assignment.description}</Typography>

          <Divider sx={{ mt: 3 }} />
        </Box>
        {assignment.assignmentFiles.length > 0 && (
          <>
            <Typography variant="h6" gutterBottom>
              {t("course.attachedFiles")}
            </Typography>

            <Box display="flex" gap={2} flexWrap={"wrap"}>
              {assignment.assignmentFiles.map((file, index) => (
                <Box
                  key={index}
                  component="a"
                  href={file.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "primary.main",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <Download fontSize="small" sx={{ mr: 1 }} />
                  {file.fileName}
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
          </>
        )}
      </Card>
      <Card sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t("course.submitYourAnswer")}
        </Typography>

        <TextField
          label={t("course.answerText")}
          multiline
          fullWidth
          rows={4}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box display={"flex"} justifyContent={"space-between"} mb={2}>
          <Button variant="outlined" component="label">
            {t("course.uploadFiles")}
            <input hidden type="file" multiple onChange={handleFileChange} />
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {t("course.submit")}
          </Button>
        </Box>
        {files.length > 0 && (
          <List>
            {files.map((file, index) => (
              <ListItem key={index}>
                <AttachFileIcon fontSize="small" />
                <ListItemText primary={file.name} />
              </ListItem>
            ))}
          </List>
        )}
      </Card>
    </Box>
  );
};
