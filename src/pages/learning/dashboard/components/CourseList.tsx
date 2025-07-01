import React, { useState } from "react";
import {
  Box,
  Button,
  InputBase,
  Paper,
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
  CardContent,
  CardActions,
  Card,
  CardMedia,
  Pagination,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { useCategories } from "../../../../hooks/useCategories";
import { useQuery } from "@tanstack/react-query";
import { getAllCourses } from "../../../../api/courseApi";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import CourseCard from "../../../../assets/courseCard.png";

const PAGE_SIZE = 12;

type SortField = "createdAt" | "title";
type SortOption = {
  label: string;
  value: SortField;
  ascending: boolean;
};

export interface GetCourseListParams {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  category: string;
  sortBy?: string;
  descending?: boolean;
}

const CourseList = () => {
  const { t } = useTranslation();
  const axios = useAxiosPrivate();
  const { categories, loading: catLoading, error: catError } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortField | "">("");
  const [descending, setDescending] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const sortOptions: SortOption[] = [
    { label: t("learning.newest"), value: "createdAt", ascending: false },
    { label: t("learning.oldest"), value: "createdAt", ascending: true },
    { label: t("learning.titleAsc"), value: "title", ascending: true },
    { label: t("learning.titleDesc"), value: "title", ascending: false },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "courses",
      { pageNumber, category, sortBy, descending, submittedSearchTerm },
    ],
    queryFn: () =>
      getAllCourses(axios, {
        page: pageNumber,
        pageSize: PAGE_SIZE,
        searchTerm: submittedSearchTerm,
        category: category || undefined,
        sortBy: sortBy ?? undefined,
        descending,
      }),
  });

  const courses = data?.items ?? [];
  const currentPage = data?.page ?? 1;
  const pageCount = data?.totalPages ?? 1;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNumber(1);
    setSubmittedSearchTerm(searchTerm);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    console.log(error.message);
    return (
      <Typography color="error" align="center" mt={4}>
        {t("learning.courseLoadError")}
      </Typography>
    );
  }

  return (
    <Box mb={3}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        gap={1}
        mt={3}
      >
        <TextField
          select
          label={t("learning.category")}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          size="small"
          sx={{ flex: 1 }}
          disabled={catLoading || !!catError}
        >
          <MenuItem value="">{t("learning.all")}</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label={t("learning.sorting")}
          value={sortBy ? `${sortBy}_${descending ? "desc" : "asc"}` : ""}
          sx={{ flex: 1 }}
          onChange={(e) => {
            const value = e.target.value;
            setPageNumber(1);
            if (!value) {
              setSortBy("");
              setDescending(false);
              setPageNumber(1);
              return;
            }

            const [field, direction] = value.split("_");
            setSortBy(field as SortField);
            setDescending(direction === "desc");
            setPageNumber(1);
          }}
        >
          <MenuItem value="">{t("learning.none")}</MenuItem>
          {sortOptions.map((opt) => (
            <MenuItem
              key={`${opt.value}_${opt.ascending ? "asc" : "desc"}`}
              value={`${opt.value}_${opt.ascending ? "asc" : "desc"}`}
            >
              {opt.label}
            </MenuItem>
          ))}
        </TextField>

        <Paper
          elevation={0}
          sx={{
            flex: 5,
            display: "flex",
            alignItems: "center",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            px: 1,
          }}
        >
          <SearchIcon sx={{ color: "text.disabled", mr: 1 }} />
          <InputBase
            placeholder={t("learning.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
          />
        </Paper>

        <Button
          type="submit"
          variant="contained"
          sx={{ flex: 1, borderRadius: 1 }}
        >
          {t("learning.search")}
        </Button>

        {catLoading && <CircularProgress size={24} />}
        {catError && (
          <Box color="error.main">{t("learning.failedToLoadCategories")}</Box>
        )}
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        gap={1}
        mt={4}
        justifyContent="space-between"
        sx={{
          boxShadow: "none",
        }}
      >
        {Array.isArray(courses) && courses.length === 0 ? (
          <Typography>{t("learning.noCourses")}</Typography>
        ) : (
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl: 20}}
          >
            {courses.map((course) => (
              <Grid key={course.id} size={{xs: 4, md: 4, lg: 4, xl: 5}}>
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
                    <Typography gutterBottom variant="h6">
                      {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="medium"
                      variant="contained"
                      sx={{ flex: 1, borderRadius: 2, m: 1}}
                    >
                      {t("learning.learnMore")}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
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

export default CourseList;
