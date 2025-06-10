import { useEffect } from "react";
import { useAuthUser } from "../auth/useAuthUser";

export const LoginPage = () => {
  const { signinRedirect } = useAuthUser();
  useEffect(() => {
    signinRedirect();
  }, [signinRedirect]);
  return <div>Redirecting to sign-in…</div>;
};
