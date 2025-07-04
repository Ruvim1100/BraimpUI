import { Box, Button } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { paths } from "../../../../routes/paths";

export const TabsNavigation = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    {
      label: "Конструктор",
      path: paths.admin.courseEditor.builder.base.replace(
        ":courseId",
        courseId ?? ""
      ),
    },
    {
      label: "Студенты",
      path: paths.admin.courseEditor.students.replace(
        ":courseId",
        courseId ?? ""
      ),
    },
    {
      label: "Предпросмотр",
      path: paths.admin.courseEditor.preview.replace(
        ":courseId",
        courseId ?? ""
      ),
    },
    {
      label: "Настройки",
      path: paths.admin.courseEditor.settings.replace(
        ":courseId",
        courseId ?? ""
      ),
    },
  ];

  const currentPath = location.pathname;

  return (
    <Box
      display="flex"
      justifyContent={{ xs: "flex-start", md: "flex-end" }}
      overflow="auto"
      gap={2}
      py={2}
      borderRadius={2}
    >
      {tabs.map((tab) => (
        <Button
          key={tab.path}
          variant={currentPath === tab.path ? "contained" : "outlined"}
          onClick={() => navigate(tab.path)}
          sx={{ whiteSpace: "nowrap", flexShrink: 0 }}
        >
          {tab.label}
        </Button>
      ))}
    </Box>
  );
};
