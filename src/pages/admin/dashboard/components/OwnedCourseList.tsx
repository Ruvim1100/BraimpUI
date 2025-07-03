import CourseCard from "../../../../assets/courseCard.png";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Button,
  CardActions,
  CardMedia,
  Grid,
  Pagination,
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { getOwnedCourses } from "../../../../api/courseApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../routes/paths";
import { useState } from "react";

export const OwnedCourses = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const [pageNumber, setPageNumber] = useState(1);
  const PAGE_SIZE = 12;

  const handleContinue = (courseId: string) => {
    const coursesPath = paths.admin.courseEditor.builder.base.replace(":courseId", courseId);
    navigate(`${coursesPath}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["ownedCourses", pageNumber],
    queryFn: () =>
      getOwnedCourses(axios, { page: pageNumber, pageSize: PAGE_SIZE }),
  });

  const courses = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const pageCount = data?.totalPages ?? 1;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={4}>
        {t("learning.courseLoadError")}
      </Typography>
    );
  }

  return (
    <Box mt={4}>
      {Array.isArray(courses) && courses.length === 0 ? (
        <Typography textAlign="center">{t("learning.noCourses")}</Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 1, md: 2 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20 }}
        >
          {courses.map((course) => (
            <Grid key={course.id} size={{ xs: 4, md: 4, lg: 4, xl: 5 }}>
              <Card
                elevation={1}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.1s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                    boxShadow: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    course.thumbnailImageUrl?.trim()
                      ? course.thumbnailImageUrl
                      : CourseCard
                  }
                  alt="Course"
                  sx={{
                    width: "100%",
                    aspectRatio: "7 / 4",
                    objectFit: "cover",
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography >
                        Marketing
                    </Typography>
                  <Typography gutterBottom variant="h6">
                    {course.title}
                  </Typography>
                  {course.description && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {course.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="medium"
                    variant="contained"
                    sx={{ flex: 1, borderRadius: 2 }}
                    onClick={() => handleContinue(course.id)}
                  >
                    {t("admin.editCourse")}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(_, newPage) => setPageNumber(newPage)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
};
