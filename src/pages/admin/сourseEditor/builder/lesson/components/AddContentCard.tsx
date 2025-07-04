import { Box, Card, Typography, useTheme } from "@mui/material";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CodeOffIcon from "@mui/icons-material/CodeOff";
import FormatAlignCenterOutlinedIcon from "@mui/icons-material/FormatAlignCenterOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";

interface Props {
  onAdd?: (type: number) => void;
}

export const AddContentCard = ({ onAdd }: Props) => {
  const theme = useTheme();

  const items = [
    {
      icon: <FormatAlignCenterOutlinedIcon fontSize="large" />,
      label: "Текст",
      type: 0,
    },
    {
      icon: <InsertPhotoOutlinedIcon fontSize="large" />,
      label: "Картинка",
      type: 1,
    },
    {
      icon: <CodeOffIcon fontSize="large" />,
      label: "Код",
      type: 2,
    },
    {
      icon: <PlayCircleOutlineOutlinedIcon fontSize="large" />,
      label: "Видео",
      type: 3,
    },
  ];

  return (
    <Card elevation={3} sx={{ borderRadius: 2, p: 3, width: "70%" }}>
      <Typography
        fontWeight={500}
        sx={{ width: "100%", textAlign: "center", mb: 2 }}
      >
        Добавить контент
      </Typography>
      <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
        {items.map((item, index) => (
          <Box
            key={index}
            onClick={() => onAdd?.(item.type)}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            width={100}
            height={100}
            borderRadius={2}
            sx={{
              backgroundColor: theme.palette.action.selected,
              cursor: "pointer",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                boxShadow: 3,
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            {item.icon}
            <Typography variant="body2" mt={1}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Card>
  );
};
