import { Button } from "@mui/material";
import { useAuthUser } from '../auth/useAuthUser';
import { useTranslation } from "react-i18next";

export const SignInButton = () => {
  const { signinRedirect, isLoading, user } = useAuthUser();
  const { t } = useTranslation();

  if (isLoading) return null;
  if (user) return null;

  return (
    <Button
      onClick={() => signinRedirect()}
      variant="contained"
      sx={{
        backgroundColor: "#d0eeea",
        color: "#16b098",
        boxShadow: "none",
        "&:hover": {
          backgroundColor: "#bee6e0",
          boxShadow: "none",
        },
      }}
    >
      {t("signIn")}
    </Button>
  );
};
