import {
  Box,
  Button,
  Collapse,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { LessonItem } from "./LessonItem";
import { useTranslation } from "react-i18next";
import type { LessonLookupModel } from "../../../../../models/modules/getModules";

interface Props {
  id: string;
  title: string;
  isPublished: boolean;
  sortIndex: number;
  lessons: LessonLookupModel[];
  onLessonSelect: (lesson: {
    id: string;
    moduleId: string;
  }) => void;
}


export const ModuleItem = ({
  id: moduleId,
  title,
  isPublished,
  sortIndex,
  lessons,
  onLessonSelect,
}: Props) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Box mb={1} borderRadius={1} >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ cursor: "pointer"}}
        
        onClick={() => setOpen((prev) => !prev)}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((prev) => !prev);
            }}
          >
            {open ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          </IconButton >
          <Typography variant="body1" fontWeight={450}>
            {sortIndex}. {title}
          </Typography>
        </Box>

        <Tooltip title={isPublished ? t("admin.published") : t("admin.hidden")}>
          <IconButton
            size="small"
            color="primary"
            onClick={(e) => e.stopPropagation()}
            aria-label={isPublished ? t("admin.published") : t("admin.hidden")}
          >
            {isPublished ? (
              <VisibilityIcon fontSize="small" />
            ) : (
              <VisibilityOffIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box mt={1} ml={4}>
          {lessons.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {t("admin.noLessons")}
            </Typography>
          ) : (
            lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                onClick={() =>
                  onLessonSelect({
                    id: lesson.id,
                    moduleId: moduleId,
                  })
                }
              />
            ))
          )}
          <Box display="flex" justifyContent="center" mt={1}>
            <Button variant="outlined" size="small" sx={{ width: "80%" }}>
              + {t("admin.addLesson")}
            </Button>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
