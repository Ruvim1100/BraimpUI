import { Box, Typography, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import CoursesImage from "../assets/platformsnap.png"

const WelcomeHeroSection = () => {
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
        py: { xs: 4, md: 4 },
        color: "primary.contrastText",
        mb: 4,
      }}
    >
      <Box flex={1} pr={{ md: 4 }}>
        <Typography variant="body2" sx={{fontWeight: 400, mb: 4}}>
          {t("qualityFirst")}
          </Typography>

        <Typography variant="h4" sx={{ fontWeight: 600, mt: 1, mb: 2 }}>
          {t("platformSubtitle")}
        </Typography>

        <Typography variant="body2" sx={{ mb: 4}}>
          {t("aboutPlatform")}
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained">
            {t("tryFree")}
          </Button>
          <Button variant="outlined" color="inherit">
            {t("bookDemo")}
          </Button>
        </Stack>
      </Box>

      <Box
        flex={1}
        mt={{ xs: 4, md: 0 }}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={CoursesImage}
          alt="Preview"
          sx={{
            maxWidth: "100%",
            borderRadius: 5
          }}
        />
      </Box>
    </Box>
  );
};

export default WelcomeHeroSection;
