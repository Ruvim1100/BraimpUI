import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-context";

export const SignOutButton = () => {
  const { signoutRedirect, isLoading, user } = useAuth();
  const { t } = useTranslation();

  if (isLoading || !user) return null;

  return (
    <Button
      onClick={() => signoutRedirect()}
      variant="outlined"
      sx={{
        borderColor: "#16b098",
        color: "#16b098",
        "&:hover": {
          borderColor: "#129580",
          backgroundColor: "#f0fdfa",
        },
      }}
    >
      {t("signOut")}
    </Button>
  );
};
