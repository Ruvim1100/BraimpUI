import React, { useEffect, useState } from "react";
import CourseCard from "../../assets/courseCard.png";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import type { Course } from "../../models/courses/course";
import { getEnrolledCourses } from "../../api/courseApi";
import { useTranslation } from "react-i18next";

const EnrolledCourses: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    let isMounted = true;

    const fetchCourses = async () => {
      try {
        const data = await getEnrolledCourses(axiosPrivate);
        if (isMounted) setCourses(data);
      } catch (err: any) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCourses();
  }, [axiosPrivate]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} textAlign="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  console.log(courses);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap={3}
      mt={4}
      justifyContent="center"
      sx={{
        boxShadow: "none",
      }}
    >
      {Array.isArray(courses) && courses.length === 0 ? (
        <Typography>Вы не зарегистрированы ни на один курс.</Typography>
      ) : (
        courses.map((course) => (
          <Card
          elevation={0}
            sx={{
              maxWidth: 290,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardMedia component="img" image={CourseCard} alt="Course" />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5">
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
                size="small"
                sx={{
                  background: "#bee6e0",
                  width: "100%",
                  "&:hover": {
                    backgroundColor: "#99c9c1",
                    boxShadow: "none",
                  },
                }}
              >
                {t("continue")}
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
  );
};

export default EnrolledCourses;
