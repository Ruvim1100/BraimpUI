import { Box, Grid, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import AddIcon from "@mui/icons-material/Add";
import { FileUploadDialog } from "./FileUploadDialog";
import { useState } from "react";
import { DeleteLessonFileButton } from "./DeleteLessonFileButton";
import { useParams } from "react-router-dom";
import type { CreateLessonFileParams } from "../../../../../../models/lessonFiles/createLessonFile";
import { createLessonFile } from "../../../../../../api/lessonFilesApi";
import { queryClient } from "../../../../../../api/react-query";
import { useMutation } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";

export interface FileResourceModel {
  id: string;
  name: string;
  downloadUrl: string;
}

export interface Props {
  files: FileResourceModel[];
}

const getFileIcon = (name: string) => {
  const ext = name.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "pdf":
      return <PictureAsPdfIcon color="error" fontSize="large" />;
    case "doc":
    case "docx":
    case "txt":
    case "pptx":
    case "xlsx":
      return <DescriptionIcon color="primary" fontSize="large" />;
    default:
      return <InsertDriveFileIcon fontSize="large" />;
  }
};

export const LessonFileList = ({ files }: Props) => {
  const [open, setOpen] = useState(false);
  const { courseId, moduleId, lessonId } = useParams();

  const axios = useAxiosPrivate();

  const createLessonFileMutation = useMutation({
    mutationFn: (params: CreateLessonFileParams) =>
      createLessonFile(axios, params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonDetails", courseId, moduleId, lessonId],
      });
    },
  });

  const handleUpload = (file: File, fileName: string) => {
    if (courseId && moduleId && lessonId) {
      createLessonFileMutation.mutate({
        courseId,
        moduleId,
        lessonId,
        displayName: fileName,
        file,
      });
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
      <Typography variant="h6">Прикреплённые материалы</Typography>
      <Grid container spacing={1}>
        {files.map((file) => (
          <Grid key={file.id}>
            <Box position="relative" maxWidth={100}>
              <DeleteLessonFileButton
                id={file.id}
                courseId={courseId!}
                moduleId={moduleId!}
                lessonId={lessonId!}
              />
              <Box
                component="a"
                href={file.downloadUrl}
                display="flex"
                flexDirection="column"
                alignItems="center"
                textAlign="center"
                borderRadius={2}
                p={1}
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: "action.hover",
                    boxShadow: 2,
                  },
                }}
              >
                {getFileIcon(file.name)}
                <Typography variant="body2" sx={{ maxWidth: "90%" }}>
                  {file.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid>
          <Box
            display="flex"
            maxWidth={100}
            textAlign={"center"}
            width="100%"
            flexDirection={"column"}
            alignItems="center"
            borderRadius={2}
            onClick={() => setOpen(true)}
            p={1}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                backgroundColor: "action.hover",
                boxShadow: 2,
              },
            }}
          >
            <AddIcon fontSize={"large"} sx={{ maxWidth: 100 }} />
            <Typography variant="body2" sx={{ maxWidth: "90%" }}>
              Добавить файл
            </Typography>
          </Box>
          <FileUploadDialog
            open={open}
            onClose={() => setOpen(false)}
            onUpload={handleUpload}
          />
        </Grid>
      </Grid>
    </Box>
  );
};