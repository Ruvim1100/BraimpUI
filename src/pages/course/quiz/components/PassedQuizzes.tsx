import { useTranslation } from "react-i18next";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

interface Column {
  id: keyof QuizResult;
  labelKey: string;
  align?: "right" | "center";
  format?: (value: any) => string;
}

interface QuizResult {
  id: string;
  quizTitle: string;
  score: string;
  statusPassed: boolean;
  attemptsUsed: string;
  completionDate: string;
  durationMinutes: number;
}

const rows: QuizResult[] = [
  {
    id: "a12f5fa4-1c7f-4c78-b0f5-bb508c4218a3",
    quizTitle: "Math Basics",
    score: "85 / 100",
    statusPassed: true,
    attemptsUsed: "1",
    completionDate: "2025-06-30T10:15:00",
    durationMinutes: 17,
  },
  {
    id: "b23f6cb5-2d8e-4e89-a2d6-cc609d5229b4",
    quizTitle: "Ancient Rome History",
    score: "74 / 100",
    statusPassed: true,
    attemptsUsed: "2",
    completionDate: "2025-06-29T14:20:00",
    durationMinutes: 23,
  },
  {
    id: "c34g7dc6-3e9f-5f90-b3e7-dd70ae633ac5",
    quizTitle: "Physics Fundamentals",
    score: "40 / 100",
    statusPassed: false,
    attemptsUsed: "3",
    completionDate: "2025-06-28T11:00:00",
    durationMinutes: 19,
  },
];

export const PassedQuizzes = () => {
  const { t } = useTranslation();

  const columns: readonly Column[] = [
    { id: "quizTitle", labelKey: "course.quizTitle" },
    { id: "score", labelKey: "course.score", align: "right" },
    { id: "statusPassed", labelKey: "course.status", align: "center" },
    { id: "attemptsUsed", labelKey: "course.attemptNumber", align: "center" },
    {
      id: "completionDate",
      labelKey: "course.completionDate",
      align: "center",
      format: (value: string) => new Date(value).toLocaleDateString("en-US"),
    },
    {
      id: "durationMinutes",
      labelKey: "course.durationMinutes",
      align: "center",
    },
  ];

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ width: "100%", boxShadow: 0, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            {t("course.attemptHistory")}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer>
              <Table stickyHeader aria-label="quiz results table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {t(column.labelKey)}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow hover key={row.id}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            key={`${row.id}-${column.id}`}
                            align={column.align}
                            sx={
                              column.id === "quizTitle"
                                ? { fontWeight: "bold" }
                                : undefined
                            }
                          >
                            {column.id === "statusPassed"
                              ? t(
                                  value
                                    ? "course.statusPassed"
                                    : "course.statusFailed"
                                )
                              : column.format
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </CardContent>
      </Card>
    </Box>
  );
}
