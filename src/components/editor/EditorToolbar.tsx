import { Editor } from "@tiptap/react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import TitleIcon from "@mui/icons-material/Title"

interface Props {
  editor: Editor;
}

export default function EditorToolbar({ editor }: Props) {
  if (!editor) return null;

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        borderBottom: "1px solid",
        borderColor: "divider",
        pb: 1,
        mb: 1,
      }}
    >
      <Tooltip title="Bold">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          color={editor.isActive("bold") ? "primary" : "default"}
        >
          <FormatBoldIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Italic">
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          color={editor.isActive("italic") ? "primary" : "default"}
        >
          <FormatItalicIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Bullet List">
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          color={editor.isActive("bulletList") ? "primary" : "default"}
        >
          <FormatListBulletedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Numbered List">
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          color={editor.isActive("orderedList") ? "primary" : "default"}
        >
          <FormatListNumberedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 1">
        <IconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          color={
            editor.isActive("heading", { level: 1 }) ? "primary" : "default"
          }
        >
          
          <TitleIcon fontSize="small" />
          <Typography fontSize={"body2"} fontWeight={500}>1</Typography>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 2">
        <IconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          color={
            editor.isActive("heading", { level: 2 }) ? "primary" : "default"
          }
        >
          <TitleIcon fontSize="small" />
          <Typography fontSize={"body2"} fontWeight={500}>2</Typography>
        </IconButton>
      </Tooltip>

      <Tooltip title="Heading 3">
        <IconButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          color={
            editor.isActive("heading", { level: 3 }) ? "primary" : "default"
          }
        >
          <TitleIcon fontSize="small" />
          <Typography fontSize={"body2"} fontWeight={500}>3</Typography>
        </IconButton>
      </Tooltip>
    </Box>
  );
}
