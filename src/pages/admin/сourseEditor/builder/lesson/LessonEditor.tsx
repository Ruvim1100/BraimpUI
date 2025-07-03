import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getLessonDetails } from "../../../../../api/lessonApi";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import { LessonFileList } from "./components/LessonFileList";

export const LessonEditor = () => {
  const axios = useAxiosPrivate();
  const { courseId, moduleId, lessonId } = useParams();
  const {
    data: lesson,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["lessonDetails", courseId, moduleId, lessonId],
    queryFn: () => getLessonDetails(axios, courseId!, moduleId!, lessonId!),
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
        Ошибка загрузки Урока
      </Typography>
    );
  }

  return (
    <Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Typography variant="h5" color="primary" fontWeight={600}>
          {lesson?.title}
        </Typography>
        <Divider sx={{ my: 2, width: "90%" }} />
        <Typography>{lesson?.description}</Typography>
      </Box>
      <Box marginBottom={5}>
        Non consequat laboris consectetur in. Sint commodo nulla nisi fugiat
        veniam enim non aliqua aliqua ex pariatur aliquip incididunt officia.
        Aliquip ex aute enim adipisicing excepteur ad aliquip Lorem mollit.
        Exercitation eiusmod voluptate ut excepteur ullamco consectetur non
        proident. Voluptate proident exercitation aliqua deserunt ex. Eu
        cupidatat adipisicing nulla voluptate ad elit officia duis nisi nisi
        minim. Cillum cillum mollit minim sunt occaecat do ea deserunt sit et
        exercitation. In mollit minim cillum qui ipsum officia voluptate sunt
        exercitation aute. Mollit incididunt amet deserunt eiusmod aliquip
        laborum cillum proident do nulla qui. Ea adipisicing qui irure irure
        eiusmod minim ullamco nulla incididunt ad consectetur velit consectetur
        reprehenderit. Nostrud officia est duis deserunt fugiat velit ullamco eu
        nisi. Fugiat consequat ea ex et commodo magna velit nisi incididunt.
        Amet proident enim ad fugiat aliquip occaecat. Dolor laboris labore
        minim amet labore duis. In ad aliqua excepteur deserunt sunt nostrud
        sint in quis non qui magna ipsum. Laboris duis consectetur ex aliqua
        voluptate magna culpa laborum cupidatat commodo. Mollit velit veniam
        officia aliquip incididunt ut elit officia ea. Duis magna nostrud
        exercitation dolore mollit consequat esse tempor nostrud ipsum anim.
        Mollit duis quis sunt est incididunt sit amet aute qui aliquip commodo
        ipsum in. Do ullamco amet et consequat. Fugiat anim irure eiusmod labore
        duis aliqua ipsum officia aute fugiat nisi est qui esse. Mollit velit
        dolore aliquip ad et qui adipisicing enim nisi. Labore voluptate aute
        nostrud qui eu dolor exercitation voluptate fugiat deserunt.
      </Box>
      <LessonFileList files={lesson?.files ?? []} />
    </Box>
  );
};
