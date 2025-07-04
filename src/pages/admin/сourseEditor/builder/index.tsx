import {
  Box,
  Card,
  CircularProgress,
  Grid,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ModuleList } from "./components/ModuleList";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getModules } from "../../../../api/moduleApi";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { paths } from "../../../../routes/paths";
import { useState } from "react";

export const BuilderLayout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const {
    data: modules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getModules(axios, courseId!),
  });

  const [view, setView] = useState<"modules" | "content">("modules");

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center">
        Ошибка загрузки структуры курса
      </Typography>
    );
  }

  return (
    <Box>
      {isSmallScreen && (
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, newView) => {
            if (newView) setView(newView);
          }}
          fullWidth
          sx={{ mb: 2 }}
        >
          <ToggleButton value="modules">{t("admin.modules")}</ToggleButton>
          <ToggleButton value="content">{t("admin.lessonContent")}</ToggleButton>
        </ToggleButtonGroup>
      )}

      <Grid container spacing={3} columns={{ xs: 8, sm: 8, md: 12, lg: 20 }}>
        <Grid
          size={{ xs: 8, sm: 8, md: 3, lg: 6 }}
          sx={{
            display: isSmallScreen && view !== "modules" ? "none" : "block",
          }}
        >
          {modules!.length === 0 ? (
            <Typography variant="body2" color="text.secondary" align="center" mt={2}>
              {t("admin.noModulesYet")}
            </Typography>
          ) : (
            <ModuleList
              modules={modules!}
              onLessonSelect={(lesson) =>
                navigate(
                  paths.admin.courseEditor.builder.lessonEditor
                    .replace(":courseId", courseId!)
                    .replace(":moduleId", lesson.moduleId!)
                    .replace(":lessonId", lesson.id)
                )
              }
            />
          )}
        </Grid>

        <Grid
          size={{ xs: 8, sm: 8, md: 9, lg: 14 }}
          sx={{
            display: isSmallScreen && view !== "content" ? "none" : "block",
          }}
        >
          <Card elevation={0} sx={{ width: "100%", boxShadow: 1, p: 2, minHeight: 500 }}>
            <Outlet />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
