import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import CoursesImage from "../../../assets/platformsnap.png"
import { Link as RouterLink } from "react-router-dom";

const WelcomeBanner = () => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "primary.main",
        borderRadius: 4,
        px: { xs: 3, md: 6 },
        py: { xs: 6, md: 8 },
        color: "primary.contrastText",
        mb: 6,
        gap: { xs: 4, md: 0 },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          pr: { md: 6 },
        }}
      >
        <Typography variant="body1" sx={{ mb: 5, lineHeight: 1}}>
          {t("qualityFirst")}
        </Typography>

        <Typography
          variant="h3"
          sx={{ fontWeight: 700, mb: 3, lineHeight: 1.3 }}
        >
          {t("platformSubtitle")}
        </Typography>

        <Typography variant="body1" sx={{ mb: 5, lineHeight: 1.6 }}>
          {t("aboutPlatform")}
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="contained"
            sx={{
              backgroundColor: "#ffffff",
              color: "primary.main",
              fontWeight: 600,
              p: 2,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            {t("tryFree")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            color="inherit"
            sx={{
              borderColor: "#ffffff",
              color: "#ffffff",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
          >
            {t("bookDemo")}
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={CoursesImage}
          alt="Platform preview"
          sx={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: 5,
            boxShadow: 3,
          }}
        />
      </Box>
    </Box>
  );
};

export default WelcomeBanner;
