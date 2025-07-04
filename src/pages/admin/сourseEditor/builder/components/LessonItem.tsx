import { Box, Typography } from "@mui/material";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import type { LessonLookupModel } from "../../../../../models/modules/getModules";

interface Props {
  lesson: LessonLookupModel;
  onClick: () => void;
}

export const LessonItem = ({ lesson, onClick }: Props) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      px={1}
      py={0.5}
      mt={0.5}
      borderRadius={1}
      sx={{
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "action.hover",
        },
      }}
      onClick={onClick}
    >
      <SchoolOutlinedIcon fontSize="small" color="primary" />
      <Typography fontSize={14}  fontWeight={500}>
        {lesson.title}
      </Typography>
    </Box>
  );
};
