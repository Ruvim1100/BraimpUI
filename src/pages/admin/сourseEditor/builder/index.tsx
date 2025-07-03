import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { ModuleList } from "./components/ModuleList";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { getModules } from "../../../../api/moduleApi";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { paths } from "../../../../routes/paths";

export const BuilderLayout = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    data: modules,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["modules", courseId],
    queryFn: () => getModules(axios, courseId!),
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
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
    <Grid container spacing={3} columns={{ xs: 8, sm: 8, md: 12, lg: 20 }}>
      <Grid size={{ xs: 3, md: 3, lg: 6 }}>
        {modules!.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mt={2}
          >
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

      <Grid size={{ xs: 5, md: 9, lg: 14 }}>
        <Card
          elevation={0}
          sx={{ width: "100%", boxShadow: 1, p: 2, minHeight: 500 }}
        >
          <Outlet />
        </Card>
      </Grid>
    </Grid>
  );
};
