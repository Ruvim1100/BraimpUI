import {
  Box,
  Grid,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";

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
  return (
    <Box display={"flex"} flexDirection={"column"} gap={1}>
        <Typography variant="h6">
            Прикреплённые материалы
        </Typography>
      <Grid container spacing={1}>
        {files.map((file) => (
          <Grid key={file.id}>
            <Box
            maxWidth={100}
              component="a"
              href={file.downloadUrl}
              display="flex"
              flexDirection="column"
              alignItems="center"
              textAlign="center"
            
              borderRadius={2}
              sx={{
                textDecoration: "none",
                color: "inherit",
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {getFileIcon(file.name)}

              <Typography
                variant="body2"
                sx={{
                  maxWidth: "90%",
                }}
              >
                {file.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
