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
} from "@mui/material";

import { useTranslation } from "react-i18next";
import { getEnrolledCourses } from "../../../../api/courseApi";
import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../../routes/paths";

const EnrolledCourses = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();

  const handleContinue = (courseId: string) => {
  const coursesPath = paths.course.base.replace(":courseId", courseId);
  navigate(`${coursesPath}`);
};

  const { data, isLoading, error } = useQuery({
    queryKey: ["enrolledCourses"],
    queryFn: () => getEnrolledCourses(axios),
  });

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

  const courses = data ?? [];

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={2}
      mt={4}
      justifyContent="space-between"
      sx={{
        boxShadow: "none",
      }}
    >
      {Array.isArray(courses) && courses.length === 0 ? (
        <Typography>{t("learning.notEnrolledInAnyCourses")}</Typography>
      ) : (
        courses.map((course) => (
          <Card
            key={course.id}
            elevation={0}
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(33.33% - 16px)",
                lg: 300,
              },
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
                course.thumbnailImage && course.thumbnailImage.trim() !== ""
                  ? course.thumbnailImage
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
              <Typography gutterBottom variant="h6">
                {course.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
              }}
            >
              <Button
                size="medium"
                onClick={() => handleContinue(course.id)}
                sx={{
                  background: "rgb(202, 231, 227)",
                  width: "100%",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor: " #99c9c1",
                    boxShadow: "none",
                  },
                }}
              >
                {t("learning.continue")}
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default EnrolledCourses;
