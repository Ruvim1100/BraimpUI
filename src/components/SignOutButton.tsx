import { Button } from "@mui/material";
import { useAuthUser } from '../auth/useAuthUser';
import { useTranslation } from "react-i18next";

export const SignOutButton = () => {
  const { signoutRedirect, isLoading, user } = useAuthUser();
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
