  import { useEffect } from "react";
  import { axiosPrivate } from "../api/axios";
  import useRefreshToken from "./useRefreshToken";
  import { useAuth } from "react-oidc-context";

  const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const auth = useAuth();

    useEffect(() => {
      const requestIntercept = axiosPrivate.interceptors.request.use(
        (config) => {
          if (!config.headers["Authorization"]) {
            config.headers["Authorization"] = `Bearer ${auth.user?.access_token}`;
          }
          return config;
        },
        (error) => Promise.reject(error)
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
        (response) => response,
        async (error) => {
          const prevRequest = error?.config;
          if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
              const newAccessToken = await refresh();
              prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            } catch (refreshError) {
              console.error("Refresh token failed", refreshError);
            }
          }
          return Promise.reject(error);
        }
      );

      return () => {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        axiosPrivate.interceptors.response.eject(responseIntercept);
      };
    }, [auth, refresh]);

    return axiosPrivate;
  };

  export default useAxiosPrivate;
