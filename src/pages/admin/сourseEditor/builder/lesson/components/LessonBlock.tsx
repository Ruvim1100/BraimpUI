import { Box, Button } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import TiptapEditor from "../../../../../../components/editor/TiptapEditor";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate";
import { deleteLessonBlock, updateLessonBlock } from "../../../../../../api/lessonBlocks";
import { useParams } from "react-router-dom";
import type { LessonBlockUpdateParams } from "../../../../../../models/lessonBlocks/updateLessonBlock";
import type { LessonBlockDeleteParams } from "../../../../../../models/lessonBlocks/deleteLessonBlock";

interface LessonBlockModel {
  id: string;
  blockType: "Text" | "Image" | "Code" | "Video";
  content: string;
}

export const LessonBlock = ({ block }: { block: LessonBlockModel }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(block.content);
  const [isSaving, setIsSaving] = useState(false);

  const axios = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { courseId, moduleId, lessonId } = useParams();

  const updateLessonBlockMutation = useMutation({
    mutationFn: (params: LessonBlockUpdateParams) =>
      updateLessonBlock(axios, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonBlocks", courseId, moduleId, lessonId],
      });
    },
  });

    const deleteLessonBlockMutation = useMutation({
    mutationFn: (params: LessonBlockDeleteParams) =>
      deleteLessonBlock(axios, params),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["lessonBlocks", courseId, moduleId, lessonId],
      });
    },
  });

  if (isEditing && block.blockType === "Text") {
    return (
      <Box>
        <TiptapEditor initialContent={tempContent} onChange={setTempContent} />
        <Box mt={2} display="flex" gap={2} justifyContent={"flex-end"}>
          <Button
            variant="contained"
            onClick={async () => {
              setIsSaving(true);
              await updateLessonBlockMutation.mutateAsync({
                id: block.id,
                content: tempContent,
                courseId: courseId!,
                moduleId: moduleId!,
                lessonId: lessonId!,
              });
              setIsSaving(false);
              setIsEditing(false);
            }}
            disabled={isSaving}
          >
            Сохранить
          </Button>
          <Button onClick={() => setIsEditing(false)} disabled={isSaving}>
            Отмена
          </Button>
        </Box>
      </Box>
    );
  }

  switch (block.blockType) {
    case "Text":
      return (
        <Box display={"flex"} flexDirection={"column"}>
          <Box dangerouslySetInnerHTML={{ __html: block.content }} />
          <Box display="flex" alignSelf={"flex-end"} mt={1} gap={2}>
            <Button
              variant="contained"
              size="small"
              onClick={() => setIsEditing(true)}
            >
              Редактировать
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={async () => {
                await deleteLessonBlockMutation.mutateAsync({
                id: block.id,
                courseId: courseId!,
                moduleId: moduleId!,
                lessonId: lessonId!,
              });
              }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      );

    case "Image":
      return (
        <Box>
          <img
            src={block.content}
            alt="image block"
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </Box>
      );

    case "Code":
      return (
        <Box
          component="pre"
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            borderRadius: 2,
            overflowX: "auto",
          }}
        >
          <code>{block.content}</code>
        </Box>
      );

    case "Video":
      return (
        <Box>
          <video
            controls
            src={block.content}
            style={{ maxWidth: "100%", borderRadius: 8 }}
          />
        </Box>
      );

    default:
      return null;
  }
};
