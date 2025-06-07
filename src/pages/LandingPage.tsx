import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import { useTranslation } from 'react-i18next';

export const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="xl">
      <Box>
        <Typography variant="h3">
          {t('welcome')}
        </Typography>
        <Typography>{t('description')}</Typography>
      </Box>
    </Container>
  );
};

