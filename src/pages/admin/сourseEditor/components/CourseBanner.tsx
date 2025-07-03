import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import EditIcon from "@mui/icons-material/Edit";
import BannerPlaceholder from "../../../../assets/Head.png";
import { useNavigate } from "react-router-dom";

interface CourseBannerProps {
  title: string;
  category: string;
  imageUrl?: string;
}

export const CourseBanner = ({ title, category, imageUrl }: CourseBannerProps) => {
  const navigate = useNavigate();

  const backgroundImage = imageUrl?.trim() ? imageUrl : BannerPlaceholder;

  return (
    <Box
      sx={{
        width: "100%",
        height: 200,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        color: "white",
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box
          onClick={() => navigate(-1)}
          sx={{ cursor: "pointer" }}
          display="flex"
          alignItems="center"
        >
          <ArrowBackIosIcon fontSize="small" color="primary" />
          <Typography>Все курсы</Typography>
        </Box>
        <IconButton onClick={() => navigate(-1)} color="primary" sx={{ p: 0, m: 0 }}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body1">{category}</Typography>
      </Box>
    </Box>
  );
};
