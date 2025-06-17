import { useEffect } from "react";
import { signinCallback } from "../auth/authService";
import { useNavigate }      from "react-router-dom";

export const AuthCallback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await signinCallback();
      navigate("/dasboard", { replace: true });
    })();
  }, []);
  return <p>Signing in…</p>;
};
