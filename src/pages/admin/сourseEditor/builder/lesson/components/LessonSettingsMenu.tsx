import React, { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import UnpublishedIcon from "@mui/icons-material/Unpublished";

interface LessonSettingsMenuProps {
  isPublished: boolean;
  onEdit: () => void;
  onTogglePublish: () => void;
  onDelete: () => void;
}

export const LessonSettingsMenu: React.FC<LessonSettingsMenuProps> = ({
  isPublished,
  onEdit,
  onTogglePublish,
  onDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        variant="contained"
        size="small"
        color="inherit"
        startIcon={<SettingsIcon />}
        onClick={handleClick}
      >
        Настройки
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            onEdit();
          }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Редактировать</ListItemText>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            onTogglePublish();
          }}
        >
          <ListItemIcon>
            {isPublished ? (
              <UnpublishedIcon fontSize="small" />
            ) : (
              <PublishIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {isPublished ? "Снять с публикации" : "Опубликовать"}
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem
          onClick={() => {
            handleClose();
            onDelete();
          }}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText sx={{ color: "error.main" }}>Удалить</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
