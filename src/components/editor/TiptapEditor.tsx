import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Box, Paper } from "@mui/material";
import EditorToolbar from "./EditorToolbar";

interface Props {
  initialContent?: string;
  onChange?: (html: string) => void;
}

export default function Tiptap({
  initialContent = "<p>Начните писать...</p>",
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        height: 400,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flexShrink: 0,
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 2,
          py: 1,
          backgroundColor: "background.paper",
          zIndex: 1,
        }}
      >
        <EditorToolbar editor={editor} />
      </Box>

      <Box
        sx={{
          p: 2,
          flexGrow: 1,
          overflowY: "auto",
          cursor: "text",
          "& .ProseMirror": {
            minHeight: 250,
            outline: "none",
            fontFamily: "Roboto, sans-serif",
            fontSize: "1rem",
            lineHeight: 1.5,
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
            "&:focus": {
              outline: "none",
            },
            "& p": {
              margin: 0,
              marginBottom: "1em",
            },
            "& img": {
              maxWidth: "100%",
              borderRadius: 1,
            },
          },
        }}
      >
        <EditorContent editor={editor} />
        <Box alignSelf={"flex-end"}>
        </Box>
      </Box>
    </Paper>
  );
}
