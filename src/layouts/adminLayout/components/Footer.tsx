import { Box, Container, Divider, Grid, Link, Stack, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid>
            <Typography variant="h6" gutterBottom>
              Braimp
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t("footer.description", "Modern platform for interactive learning.")}
            </Typography>
          </Grid>

          <Grid>
            <Typography variant="h6" gutterBottom>
              {t("footer.links", "Links")}
            </Typography>
            <Stack spacing={1}>
              <Link component={RouterLink} to="/about" color="inherit" underline="hover">
                {t("footer.about", "About")}
              </Link>
              <Link component={RouterLink} to="/courses" color="inherit" underline="hover">
                {t("footer.courses", "Courses")}
              </Link>
              <Link component={RouterLink} to="/contact" color="inherit" underline="hover">
                {t("footer.contact", "Contact")}
              </Link>
            </Stack>
          </Grid>

          <Grid>
            <Typography variant="h6" gutterBottom>
              {t("footer.contact", "Contact")}
            </Typography>
            <Typography variant="body2">support@braimp.com</Typography>
            <Typography variant="body2">+373 (xxx) xxx-xxx</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Typography variant="body2" color="text.secondary" align="center">
          © {year} Braimp. {t("footer.rights", "All rights reserved.")}
        </Typography>
      </Container>
    </Box>
  );
};
