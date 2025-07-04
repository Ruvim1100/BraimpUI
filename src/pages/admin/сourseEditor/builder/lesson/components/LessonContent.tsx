import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  getLessonBlocks,

} from "../../../../../../api/lessonBlocks";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { LessonBlock } from "./LessonBlock";

export const LessonContent = () => {
  const axios = useAxiosPrivate();
  const { courseId, moduleId, lessonId } = useParams();

  const {
    data: lessonBlocks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessonBlocks", courseId, moduleId, lessonId],
    queryFn: () => getLessonBlocks(axios, courseId!, moduleId!, lessonId!),
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
        Ошибка загрузки блоков
      </Typography>
    );
  }

  return (
    <Box display="flex" flexDirection="column">
      {lessonBlocks?.map((block) => (
        <LessonBlock key={block.id} block={block} />
      ))}
    </Box>
  );
};
