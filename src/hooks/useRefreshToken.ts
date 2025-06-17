import { useAuth } from "react-oidc-context";

const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    try {
      const user = await auth.signinSilent();
      return user?.access_token;
    } catch (err) {
      console.error("Silent refresh failed", err);
      throw err;
    }
  };

  return refresh;
};

export default useRefreshToken;
