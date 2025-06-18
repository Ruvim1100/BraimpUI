import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";

export const SignInButton = () => {
  const { signinRedirect, isLoading, user } = useAuth();
  const { t } = useTranslation();

  if (isLoading) return null;
  if (user) return null;
  return (
    <Button
      onClick={() => {
        console.log("Click detected");
        signinRedirect();
      }}
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
