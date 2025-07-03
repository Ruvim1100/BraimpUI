import { Box, Grid, Typography } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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
      <Typography variant="h6">Прикреплённые материалы</Typography>
      <Grid container spacing={1}>
        {files.map((file) => (
          <Grid key={file.id}>
            <Box position="relative" maxWidth={100}>
              <Tooltip title="Удалить">
                <IconButton
                  size="small"
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    zIndex: 1,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("Удалить файл:", file.id);
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>

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

                <Typography
                  variant="body2"
                  sx={{
                    maxWidth: "90%",
                  }}
                >
                  {file.name}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
        <Grid>
          <Box
            onClick={() => {
              console.log("Добавить файл");
            }}
            display="flex"
            maxWidth={100}
            textAlign={"center"}
            width="100%"
            flexDirection={"column"}
            alignItems="center"
            borderRadius={2}
            p={1}
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              color: "inherit",
              border: "1px solid",
              borderColor: "divider",
              "&:hover": {
                height: "100%",
                backgroundColor: "action.hover",
                boxShadow: 2,
              },
            }}
          >
            <AddIcon fontSize={"large"} sx={{ maxWidth: 100 }} />
            <Typography
              variant="body2"
              sx={{
                maxWidth: "90%",
              }}
            >
              Добавить файл
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
