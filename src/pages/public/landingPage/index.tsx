import { Typography, Box, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <Box>
        <Typography variant="h3">{t("welcome")}</Typography>
        <Typography>{t("description")}</Typography>
      </Box>
    </Container>
  );
};