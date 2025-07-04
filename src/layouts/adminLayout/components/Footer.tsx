import { Box, Container, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
export const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © {year} Braimp. {t("footer.rights", "All rights reserved.")}
        </Typography>
      </Container>
    </Box>
  );
};
