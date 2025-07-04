import { Box, Button } from "@mui/material";
import TiptapEditor from "../../../../../../components/editor/TiptapEditor";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { createLessonBlock } from "../../../../../../api/lessonBlocks";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { AddContentCard } from "./AddContentCard";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  onBlockCreated: () => void;
}

export const AddNewBlock = ({ onBlockCreated }: Props) => {
  const [isAdding, setIsAdding] = useState(false);
  const [tempContent, setTempContent] = useState("<p></p>");
  const [isSaving, setIsSaving] = useState(false);
  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { courseId, moduleId, lessonId } = useParams();

  const handleSave = async () => {
    setIsSaving(true);
    await createLessonBlock(axios, {
      courseId: courseId!,
      moduleId: moduleId!,
      lessonId: lessonId!,
      blockType: 0,
      content: tempContent,
    });

    await queryClient.invalidateQueries({
      queryKey: ["lessonBlocks", courseId, moduleId, lessonId],
    });

    onBlockCreated();
    setTempContent("<p></p>");
    setIsAdding(false);
    setIsSaving(false);
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} my={6} width={"100%"}>
      {isAdding ? (
        <>
          <TiptapEditor
            initialContent={tempContent}
            onChange={setTempContent}
          />
          <Box mt={2} alignSelf="end" display="flex" gap={2} justifyContent={"flex-end"}>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              variant="contained"
            >
              Сохранить
            </Button>
            <Button onClick={() => setIsAdding(false)} disabled={isSaving}>
              Отмена
            </Button>
          </Box>
        </>
      ) : (
        <AddContentCard onAdd={(type) => type === 0 && setIsAdding(true)} />
      )}
    </Box>
  );
};
